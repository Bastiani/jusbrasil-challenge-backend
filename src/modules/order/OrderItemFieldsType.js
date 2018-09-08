import { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';

export default {
  orderId: {
    type: GraphQLNonNull(GraphQLID),
    description: 'Order id of the order item',
  },
  product: {
    type: GraphQLNonNull(GraphQLID),
    description: 'Product of the order item',
  },
  qty: {
    type: GraphQLNonNull(GraphQLInt),
    description: 'Quantity of the order item',
  },
  total: {
    type: GraphQLNonNull(GraphQLString),
    description: 'Total of the order item',
  },
};
