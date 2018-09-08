import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import OrderModel from '../../../modules/order/OrderModel';

import * as OrderLoader from '../../../modules/order/OrderLoader';
import OrderType from '../../../modules/order/OrderType';

import OrderFieldsType from '../../../modules/order/OrderFieldsType';

const mutation = mutationWithClientMutationId({
  name: 'OrderEdit',
  inputFields: {
    ...OrderFieldsType,
  },
  mutateAndGetPayload: async (args, context) => {
    const { id, qty, total } = args;

    // Check if the provided ID is valid
    const order = await OrderModel.findOne({
      _id: fromGlobalId(id).id,
    });

    // If not, throw an error
    if (!order) {
      throw new Error('Invalid orderId');
    }

    await order.update({
      qty,
      total,
    });

    // Clear dataloader cache
    OrderLoader.clearCache(context, order._id);

    return {
      id: order._id,
      error: null,
    };
  },
  outputFields: {
    order: {
      type: OrderType,
      resolve: async ({ id }, args, context) => OrderLoader.load(context, id),
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});

export default mutation;
