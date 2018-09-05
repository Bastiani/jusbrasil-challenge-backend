import { GraphQLSchema } from 'graphql';

import Query from './graphql/QueryType';
import Mutation from './graphql/MutationType';

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default schema;
