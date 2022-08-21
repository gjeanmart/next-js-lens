import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  executeMutation,
  LENS_CREATE_PROFILE_GQL,
} from '../../clients/LensGraphQL';
import { stripZeros } from '../../utils/ethereum';
import { useLensLogin } from '../../utils/useLensLogin';
import Loading from '../Utils/Loading/Loading';
import { useProvider } from 'wagmi';
import { useGlobalStore } from '../../utils/state/StoreApi';

const LensCreateProfile = () => {
  const [handle, setHandle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { setProfileId } = useGlobalStore();
  const lensLogin = useLensLogin();
  const router = useRouter();
  const provider = useProvider();

  useEffect(() => {
    if (lensLogin && !lensLogin.accessToken) {
      router.push('/settings/signin');
    }
  }, [lensLogin, router]);

  const createProfile = async () => {
    try {
      setLoading(true);

      const createProfileResponse = await executeMutation(
        LENS_CREATE_PROFILE_GQL,
        {
          request: {
            handle,
          },
        }
      );

      const txHash = createProfileResponse.data.createProfile.txHash;
      console.log('txHash=' + txHash);
      const receipt = await provider.waitForTransaction(txHash);
      console.log('receipt=' + JSON.stringify(receipt));

      const profileId = stripZeros(receipt.logs[0].topics[3]);
      console.log('profileId=' + profileId);
      setProfileId(profileId);
      router.push('/profile/my');

      setLoading(false);
    } catch (exception) {
      console.log(exception);
      setLoading(false);
    }
  };

  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHandle(event.target.value);
  };

  return (
    <>
      {!loading && (
        <div>
          <input type="text" value={handle} onChange={onChangeHandle} />
          <button type="button" onClick={createProfile}>
            Create Profile
          </button>
        </div>
      )}
      {loading && <Loading />}
    </>
  );
};

export default LensCreateProfile;
