import { GraphQLString, GraphQLNonNull, GraphQLEnumType } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import * as OrderLoader from '../../../modules/order/OrderLoader';
import { OrderConnection } from '../../../modules/order/OrderType';

import OrderItemFieldsType from '../../../modules/order/OrderItemFieldsType';

import EditItem, { OPERATION_TYPE } from './EditItem';

export const OperationType = new GraphQLEnumType({
  name: 'OperationType',
  values: {
    ADD: {
      value: OPERATION_TYPE.ADD,
    },
    REMOVE: {
      value: OPERATION_TYPE.REMOVE,
    },
  },
});

const mutation = mutationWithClientMutationId({
  name: 'OrderItemEdit',
  inputFields: {
    ...OrderItemFieldsType,
    operation: {
      type: GraphQLNonNull(OperationType),
      description: 'Operation of the order item',
    },
  },
  mutateAndGetPayload: async (args, context) => {
    const { orderId, product, qty, operation } = args;

    const { message } = await EditItem(orderId, product, qty, operation);

    // Clear dataloader cache
    OrderLoader.clearCache(context, orderId);

    return {
      id: orderId,
      error: message,
    };
  },
  outputFields: {
    orderEdge: {
      type: OrderConnection.edgeType,
      resolve: async ({ id }, args, context) => {
        const order = await OrderLoader.load(context, id);

        // Returns null if no node was loaded
        if (!order) {
          return null;
        }

        return {
          cursor: toGlobalId('Order', order._id),
          node: order,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});

export default mutation;
