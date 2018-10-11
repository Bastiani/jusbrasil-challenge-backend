import { GraphQLSchema } from 'graphql';

import QueryType from './graphql/QueryType';
import MutationType from './graphql/MutationType';
import SubscriptionType from './graphql/SubscriptionType';

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  subscription: SubscriptionType,
});

export default schema;
