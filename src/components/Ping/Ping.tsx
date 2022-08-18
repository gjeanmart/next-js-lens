import { LENS_PING_GQL } from '../../clients/LensGraphQL';
import GraphQLWrapper from '../GraphQLWrapper/GraphQLWrapper';

const PingElement = (props: any) => {
  return <div>Result = {JSON.stringify(props.data)}</div>;
};

const Ping = () => {
  return (
    <GraphQLWrapper query={LENS_PING_GQL}>
      <PingElement />
    </GraphQLWrapper>
  );
};

export default Ping;
