import { GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';

export default {
  id: {
    type: GraphQLNonNull(GraphQLString),
    description: 'id of the order',
  },
  qty: {
    type: GraphQLNonNull(GraphQLInt),
    description: 'Quantity of the products',
  },
};
