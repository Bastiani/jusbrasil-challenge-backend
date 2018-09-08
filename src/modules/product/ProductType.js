import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { connectionDefinitions } from '../../graphql/connection/customConnection';

import type { GraphQLContext } from '../../flow/GraphQLContext';

import { registerType, nodeInterface } from '../../interface/Node';

import type { Product } from './ProductLoader';

const ProductType = registerType(
  new GraphQLObjectType(
    ({
      name: 'Product',
      description: 'Product type definition',
      fields: () => ({
        id: globalIdField('Product'),
        _id: {
          type: GraphQLNonNull(GraphQLString),
          resolve: ({ _id }) => _id,
        },
        description: {
          type: GraphQLNonNull(GraphQLString),
          description: 'Description of the product',
          resolve: product => product.description,
        },
        value: {
          type: GraphQLNonNull(GraphQLString),
          description: 'Value of the product',
          resolve: product => product.value,
        },
        qty: {
          type: GraphQLInt,
          description: 'Quantity of the product',
          resolve: product => product.qty,
        },
        picture: {
          type: GraphQLNonNull(GraphQLString),
          description: 'URL of the product',
          resolve: product => product.picture,
        },
        active: {
          type: GraphQLNonNull(GraphQLBoolean),
          description: 'Active of the product',
          resolve: product => product.active,
        },
      }),
      interfaces: () => [nodeInterface],
    }: GraphQLObjectTypeConfig<Product, GraphQLContext>),
  ),
);

export const ProductConnection = connectionDefinitions({
  name: 'Product',
  nodeType: GraphQLNonNull(ProductType),
});

export default ProductType;
