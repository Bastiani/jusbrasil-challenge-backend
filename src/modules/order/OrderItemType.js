import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';

import { connectionDefinitions } from '../../graphql/connection/customConnection';

import type { GraphQLContext } from '../../flow/GraphQLContext';

import { registerType } from '../../interface/Node';

import ProductType from '../product/ProductType';
import * as ProductLoader from '../product/ProductLoader';

const OrderItemType = registerType(
  new GraphQLObjectType(
    ({
      name: 'OrderItem',
      description: 'OrderItem type definition',
      fields: () => ({
        orderId: {
          type: GraphQLString,
          description: 'Returns the id of the order that this item belongs to',
          resolve: ({ orderId }) => orderId,
        },
        product: {
          type: GraphQLNonNull(ProductType),
          description: 'Product of the order',
          resolve: async ({ product }, args, context) => ProductLoader.load(context, product),
        },
        qty: {
          type: GraphQLNonNull(GraphQLInt),
          description: 'Quantity of the products',
          resolve: obj => obj.qty,
        },
        total: {
          type: GraphQLNonNull(GraphQLString),
          description: 'Total of the products',
          resolve: obj => obj.total,
        },
      }),
    }: GraphQLObjectTypeConfig<OrderItemType, GraphQLContext>),
  ),
);

export const OrderItemConnection = connectionDefinitions({
  name: 'OrderItem',
  nodeType: GraphQLNonNull(OrderItemType),
});

export default OrderItemType;
