import { GraphQLBoolean, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLFloat } from 'graphql';

export const ProductInputType = {
  description: {
    type: GraphQLNonNull(GraphQLString),
    description: 'Description of the product',
  },
  value: {
    type: GraphQLNonNull(GraphQLFloat),
    description: 'Value of the product',
  },
  qty: {
    type: GraphQLInt,
    description: 'Quantity of the product',
  },
  picture: {
    type: GraphQLNonNull(GraphQLString),
    description: 'URL of the product',
  },
  active: {
    type: GraphQLNonNull(GraphQLBoolean),
    description: 'Active of the product',
  },
};
