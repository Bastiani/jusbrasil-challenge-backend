import { GraphQLObjectType } from 'graphql';

import ProductAdded from './subscriptions/product/ProductAdded';

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ProductAdded,
  },
});
