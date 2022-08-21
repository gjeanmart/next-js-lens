import { executeQuery, LENS_GET_PROFILES_GQL } from '../../clients/LensGraphQL';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '../Utils/Loading/Loading';
import { useLensLogin } from '../../utils/useLensLogin';

interface IProfile {
  id: string;
  handle: string;
}

const GetLensProfile = () => {
  const lensLogin = useLensLogin();
  const router = useRouter();
  const [profile, setProfile] = useState<IProfile>();

  useEffect(() => {
    async function getProfile() {
      if (!lensLogin) {
        return;
      }

      if (lensLogin && !lensLogin.isConnected) {
        router.push('/settings/signin');
        return;
      }

      const getProfileResponse = await executeQuery(LENS_GET_PROFILES_GQL, {
        request: {
          ownedBy: [lensLogin.accountAddress],
        },
      });

      if (getProfileResponse.data?.profiles.items.length == 0) {
        router.push('/profile/create');
        return;
      }

      setProfile({
        id: getProfileResponse.data?.profiles.items[0].id,
        handle: getProfileResponse.data?.profiles.items[0].handle,
      });
    }

    getProfile();
  }, [lensLogin, router]);

  if (!profile) return <Loading />;

  return (
    <div>
      <div>Profile ID: {profile.id}</div>
      <div>Profile handle: {profile.handle}</div>
    </div>
  );
};

export default GetLensProfile;
