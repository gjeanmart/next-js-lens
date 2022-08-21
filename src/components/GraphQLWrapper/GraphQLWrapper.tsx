import { useQuery } from '@apollo/client';
import { addPropsToChildren } from '../../utils/react';
import Error from '../Utils/Error/Error';
import Loading from '../Utils/Loading/Loading';

const GraphQLWrapper = (props: any) => {
  const { children, query, variables } = props;
  const { loading, error, data } = useQuery(query, { variables });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return addPropsToChildren(children, { data });
};

export default GraphQLWrapper;
