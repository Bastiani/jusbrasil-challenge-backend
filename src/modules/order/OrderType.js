import { GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { connectionDefinitions } from '../../graphql/connection/customConnection';

import type { GraphQLContext } from '../../flow/GraphQLContext';

import { registerType, nodeInterface } from '../../interface/Node';

import type { OrderFlowType } from '../../flow/OrderFlowType';

import OrderItemType from './OrderItemType';

const OrderType = registerType(
  new GraphQLObjectType(
    ({
      name: 'Order',
      description: 'Order type definition',
      fields: () => ({
        id: globalIdField('Order'),
        _id: {
          type: GraphQLNonNull(GraphQLString),
          resolve: ({ _id }) => _id,
        },
        orderItems: {
          type: GraphQLList(OrderItemType),
          description: 'Product of the order',
          resolve: obj => obj.orderItems.reduce((prev, curr) => [...prev, { orderId: obj._id, ...curr.toObject() }], []),
        },
        qty: {
          type: GraphQLInt,
          description: 'Quantity of the products',
          resolve: order => order.qty,
        },
        total: {
          type: GraphQLInt,
          description: 'Total of the products',
          resolve: order => order.total,
        },
      }),
      interfaces: () => [nodeInterface],
    }: GraphQLObjectTypeConfig<OrderFlowType, GraphQLContext>),
  ),
);

export const OrderConnection = connectionDefinitions({
  name: 'Order',
  nodeType: GraphQLNonNull(OrderType),
});

export default OrderType;
