import { createContext } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';

export interface IWalletContextInterface {
  address: string;
  chainId: number;
  provider: Web3Provider;
}

export const WalletContext = createContext<IWalletContextInterface | null>(
  null
);

const ConnectWalletWrapper = (props: any) => {
  const { children } = props;

  const { chainId, account, activate, active, library } =
    useWeb3React<Web3Provider>();

  const walletContext: IWalletContextInterface = {
    address: account as string,
    chainId: chainId as number,
    provider: library as Web3Provider,
  };

  const connectWallet = () => {
    activate(
      new InjectedConnector({
        supportedChainIds: [1, 3, 4, 5, 42],
      })
    );
  };

  return (
    <>
      {active && (
        <div>
          <div>Account: {account}</div>
          <WalletContext.Provider value={walletContext}>
            {children}
          </WalletContext.Provider>
        </div>
      )}

      {!active && (
        <button type="button" onClick={connectWallet}>
          Connect
        </button>
      )}
    </>
  );
};

export default ConnectWalletWrapper;
