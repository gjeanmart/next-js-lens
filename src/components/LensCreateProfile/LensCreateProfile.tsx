import { useContext, useState } from 'react';
import {
  executeMutation,
  LENS_CREATE_PROFILE_GQL,
} from '../../clients/LensGraphQL';
import {
  WalletContext,
} from '../ConnectWalletWrapper/ConnectWalletWrapper';

const LensCreateProfile = () => {
  const [handle, setHandle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const walletContext = useContext(WalletContext);
  if (walletContext == null) return <div>Error: No context</div>;

  const createProfile = async () => {
    setLoading(true);

    const createProfileResponse = await executeMutation(
      LENS_CREATE_PROFILE_GQL,
      {
        request: {
          handle,
        },
      }
    );

    setLoading(false);
    console.log(
      'createProfileResponse=' + JSON.stringify(createProfileResponse)
    );
  };

  const onChangeHandle = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setHandle(event.target.value);
  };

  return (
    <>
      <div>
        <input type="text" value={handle} onChange={onChangeHandle} />
        <button type="button" onClick={createProfile}>
          Create Profile
        </button>
      </div>
    </>
  );
};

export default LensCreateProfile;
