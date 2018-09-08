import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import OrderModel from '../../../modules/order/OrderModel';

import * as OrderLoader from '../../../modules/order/OrderLoader';
import OrderType from '../../../modules/order/OrderType';

import OrderItemFieldsType from '../../../modules/order/OrderItemFieldsType';

const mutation = mutationWithClientMutationId({
  name: 'OrderItemEdit',
  inputFields: {
    ...OrderItemFieldsType,
  },
  mutateAndGetPayload: async (args, context) => {
    const { orderId, product, qty, total } = args;

    // Check if the provided ID is valid
    const order = await OrderModel.findOne({
      _id: fromGlobalId(orderId).id,
    });

    // If not, throw an error
    if (!order) {
      throw new Error('Invalid orderId');
    }

    await OrderModel.findOneAndUpdate(
      {
        $and: [{ _id: fromGlobalId(orderId).id, 'orderItems.product': fromGlobalId(product).id }],
      },
      {
        $set: { 'orderItems.$.qty': qty, 'orderItems.$.total': total },
      },
    );

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
