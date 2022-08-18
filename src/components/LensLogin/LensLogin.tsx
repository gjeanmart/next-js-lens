import { useContext, useState } from 'react';
import {
  executeMutation,
  executeQuery,
  LENS_AUTHENTICATION_GQL,
  LENS_GENERATE_CHALLENGE_GQL,
} from '../../clients/LensGraphQL';
import { signText } from '../../utils/ethereum';
import {
  WalletContext,
  IWalletContextInterface,
} from '../ConnectWalletWrapper/ConnectWalletWrapper';
import Loading from '../Utils/Loading/Loading';

enum LensLoginStatus {
  UNAUTHENTICATED,
  AUTHENTICATING,
  AUTHENTICATED,
}

interface ILensLoginState {
  status: LensLoginStatus;
  accessToken?: string;
  refreshToken?: string;
}

const LensLogin = () => {
  const [lensloginState, setLensloginState] = useState<
    ILensLoginState | undefined
  >({ status: LensLoginStatus.UNAUTHENTICATED });

  const walletContext = useContext(WalletContext);
  if (walletContext == null) return <div>Error: No context</div>;

  const login = async (walletContext: IWalletContextInterface) => {
    setLensloginState({ status: LensLoginStatus.AUTHENTICATING });

    // we request a challenge from the server
    const challengeResponse = await executeQuery(LENS_GENERATE_CHALLENGE_GQL, {
      request: {
        address: walletContext.address,
      },
    });

    // sign the text with the wallet
    const signature = await signText(
      walletContext.provider,
      challengeResponse.data.challenge.text
    );

    // authenticate
    const authenticationResponse = await executeMutation(
      LENS_AUTHENTICATION_GQL,
      {
        request: {
          address: walletContext.address,
          signature,
        },
      }
    );

    // Save the result in the state + local storage
    const {accessToken, refreshToken } = authenticationResponse.data.authenticate
    setLensloginState({
      status: LensLoginStatus.AUTHENTICATED,
      accessToken,
      refreshToken,
    });
    localStorage.setItem("lens::access_token", accessToken)
    localStorage.setItem("lens::refresh_token", refreshToken)
  };

  return (
    <>
      {(() => {
        switch (lensloginState?.status) {
          case LensLoginStatus.UNAUTHENTICATED:
            return (
              <div>
                <button type="button" onClick={() => login(walletContext)}>
                  Lens Login
                </button>
              </div>
            );
          case LensLoginStatus.AUTHENTICATING:
            return <Loading />;
          default:
            return (
              <div>
                Access token: {lensloginState?.accessToken?.substring(0, 24)}...
              </div>
            );
        }
      })()}
    </>
  );
};

export default LensLogin;
