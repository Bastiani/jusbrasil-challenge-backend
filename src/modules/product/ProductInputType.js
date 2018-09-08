import { GraphQLInputObjectType, GraphQLBoolean, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';

export const ProductInputType = new GraphQLInputObjectType({
  name: 'ProductInputType',
  description: 'An input object that describes an Order Item',
  fields: () => ({
    description: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Description of the product',
    },
    value: {
      type: GraphQLNonNull(GraphQLString),
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
  }),
});
