import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import * as OrderLoader from '../../../modules/order/OrderLoader';
import OrderType from '../../../modules/order/OrderType';

import OrderItemFieldsType from '../../../modules/order/OrderItemFieldsType';

import EditItem from './EditItem';

const mutation = mutationWithClientMutationId({
  name: 'OrderItemEdit',
  inputFields: {
    ...OrderItemFieldsType,
  },
  mutateAndGetPayload: async (args, context) => {
    const { orderId, product, qty } = args;

    const { message } = await EditItem(orderId, product, qty);

    // Clear dataloader cache
    OrderLoader.clearCache(context, orderId);

    return {
      id: orderId,
      error: message,
    };
  },
  outputFields: {
    order: {
      type: OrderType,
      resolve: async ({ id }, args, context) => {
        const newOrder = await OrderLoader.load(context, id);

        if (!newOrder) {
          return null;
        }

        return newOrder;
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});

export default mutation;
