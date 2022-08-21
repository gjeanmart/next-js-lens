import { useState } from 'react';
import {
  executeMutation,
  executeQuery,
  LENS_AUTHENTICATION_GQL,
  LENS_GENERATE_CHALLENGE_GQL,
  LENS_GET_PROFILES_GQL,
} from '../../clients/LensGraphQL';
import Loading from '../Utils/Loading/Loading';
import { useRouter } from 'next/router';
import { useAccount, useSignMessage } from 'wagmi';
import ConnectWallet from '../ConnectWallet/ConnectWallet';
import { useLensLogin } from '../../utils/useLensLogin';
import { useGlobalStore } from '../../utils/state/StoreApi';
import Link from 'next/link';

interface IProfile {
  profileId: string;
  handle: string;
}

const LensLogin = () => {
  const { accessToken, setAccessToken, setRefreshToken, setProfileId } =
    useGlobalStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const router = useRouter();
  const web3Account = useAccount();
  const lensLogin = useLensLogin(true);
  const { signMessageAsync } = useSignMessage();

  if (!lensLogin) {
    return <Loading />;
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

    // Get existing profiles
    const getProfileResponse = await executeQuery(LENS_GET_PROFILES_GQL, {
      request: {
        ownedBy: [web3Account.address],
      },
    });

    // 0 profile found - redirect to create-profile
    if (getProfileResponse.data?.profiles.items.length == 0) {
      router.push('/profile/create');
      return;
    }

    // 1 profile found - redirect to get-profile
    if (getProfileResponse.data?.profiles.items.length == 1) {
      setProfileId(getProfileResponse.data?.profiles.items[0].id);
      return;
    }

    // > 1 profiles found - select your profile
    setProfiles(
      getProfileResponse.data?.profiles.items.map((item: any) => {
        return { profileId: item.id, handle: item.handle };
      })
    );

    setLoading(false);
  };

  const selectProfile = (index: string) => {
    const { profileId } = profiles[parseInt(index)];
    setProfileId(profileId);
  };

  return (
    <>
      {!web3Account.isConnected && <ConnectWallet />}

      {web3Account.isConnected && !accessToken && !loading && (
        <div>
          <button type="button" onClick={login}>
            Lens Login
          </button>
        </div>
      )}

      {web3Account.isConnected && !accessToken && loading && <Loading />}

      {web3Account.isConnected && accessToken && (
        <>
          <div>Select your profile</div>
          <div>
            <select onChange={(e) => selectProfile(e.target.value)}>
              <option key="null"> </option>
              {profiles.map((profile, index) => (
                <option key={profile.profileId} value={index}>
                  {profile.handle}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Link href="/profile/create">
              <button>Create a new profile</button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default LensLogin;
