import { GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';

export default {
  qty: {
    type: GraphQLNonNull(GraphQLInt),
    description: 'Quantity of the products',
  },
  total: {
    type: GraphQLNonNull(GraphQLString),
    description: 'Total of the products',
  },
};
