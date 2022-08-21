import { LENS_GET_PROFILE_GQL } from '../../clients/LensGraphQL';
import Loading from '../Utils/Loading/Loading';
import { useLensLogin } from '../../utils/useLensLogin';
import GraphQLWrapper from '../GraphQLWrapper/GraphQLWrapper';

const LensProfile = (props: any) => {
  return (
    <div>
      <div>Profile ID: {props.data.profile.id}</div>
      <div>Profile handle: {props.data.profile.handle}</div>
    </div>
  );
};

const GetLensProfile = () => {
  const lensLogin = useLensLogin(true);

  if (!lensLogin || !lensLogin.isConnected) return <Loading />;
  
  return (
    <GraphQLWrapper
      query={LENS_GET_PROFILE_GQL}
      variables={{
        request: {
          profileId: lensLogin.profileId,
        },
      }}
    >
      <LensProfile />
    </GraphQLWrapper>
  );
};

export default GetLensProfile;
