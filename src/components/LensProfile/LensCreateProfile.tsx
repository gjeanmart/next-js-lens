import { useContext, useState } from 'react';
import {
  executeMutation,
  LENS_CREATE_PROFILE_GQL,
  LENS_CREATE_SET_DEFAULT_PROFILE_TYPED_DATA_GQL,
} from '../../clients/LensGraphQL';
import { stripZeros } from '../../utils/ethereum';
import Loading from '../Utils/Loading/Loading';

const LensCreateProfile = () => {
  const [handle, setHandle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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

      const txHash = createProfileResponse.data.createProfile.txHash
      console.log("txHash="+txHash)
      // const receipt = await walletContext.provider.waitForTransaction(txHash)
      // console.log("receipt="+JSON.stringify(receipt))

      // const profileId = stripZeros(receipt.logs[0].topics[3])
      // console.log("profileId="+profileId)

      // const setDefaultProfileResponse = await executeMutation(
      //   LENS_CREATE_SET_DEFAULT_PROFILE_TYPED_DATA_GQL,
      //   {
      //     request: {
      //       profileId,
      //     },
      //   }
      // );
      // console.log("setDefaultProfileResponse=="+JSON.stringify(setDefaultProfileResponse))
      setLoading(false);

    } catch(exception) {
      console.log(exception)
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
