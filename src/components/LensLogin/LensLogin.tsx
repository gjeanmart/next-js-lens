import { useState } from 'react';
import {
  executeMutation,
  executeQuery,
  LENS_AUTHENTICATION_GQL,
  LENS_GENERATE_CHALLENGE_GQL,
} from '../../clients/LensGraphQL';
import Loading from '../Utils/Loading/Loading';
import { useRouter } from 'next/router';
import { useAccount, useSignMessage } from 'wagmi';
import ConnectWallet from '../ConnectWallet/ConnectWallet';
import { useLensLogin } from '../../utils/useLensLogin';
import { useGlobalStore } from '../../utils/state/StoreApi';

const LensLogin = () => {
  const { setAccessToken, setRefreshToken } = useGlobalStore();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const web3Account = useAccount();
  const lensLogin = useLensLogin();
  const { signMessageAsync } = useSignMessage();

  if (!lensLogin) {
    return <Loading />;
  }

  if (lensLogin.isConnected) {
    router.push('/profile/my');
    return <></>;
  }

  const login = async () => {
    setLoading(true);

    // we request a challenge from the server
    const challengeResponse = await executeQuery(LENS_GENERATE_CHALLENGE_GQL, {
      request: {
        address: web3Account.address,
      },
    });

    // sign the text with the wallet
    const signature = await signMessageAsync({
      message: challengeResponse.data.challenge.text,
    });

    // authenticate
    const authenticationResponse = await executeMutation(
      LENS_AUTHENTICATION_GQL,
      {
        request: {
          address: web3Account.address,
          signature,
        },
      }
    );

    // Save the result in global state (local storage)
    const {
      accessToken,
      refreshToken,
    }: { accessToken: string; refreshToken: string } =
      authenticationResponse.data.authenticate;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    router.push('/profile/my');

    setLoading(false);
  };

  return (
    <>
      {!web3Account.isConnected && <ConnectWallet />}
      {web3Account.isConnected && !loading && (
        <div>
          <button type="button" onClick={login}>
            Lens Login
          </button>
        </div>
      )}
      {web3Account.isConnected && loading && <Loading />}
    </>
  );
};

export default LensLogin;
