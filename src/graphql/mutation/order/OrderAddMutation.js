import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import OrderModel from '../../../modules/order/OrderModel';

import * as OrderLoader from '../../../modules/order/OrderLoader';
import OrderType from '../../../modules/order/OrderType';
import OrderItemFieldsType from '../../../modules/order/OrderItemFieldsType';

import AddItem from './AddItem';

const { orderId, ...orderItem } = OrderItemFieldsType;

const mutation = mutationWithClientMutationId({
  name: 'OrderAdd',
  inputFields: {
    ...orderItem,
  },
  mutateAndGetPayload: async (args, context) => {
    const { product, qty } = args;

    const newOrder = await new OrderModel({
      qty,
    }).save();

    const newItem = await AddItem(product, qty);
    const { qty: totalQtyItem, total: totalItem } = newItem;

    await OrderModel.findOneAndUpdate(
      {
        _id: newOrder._id,
      },
      {
        $set: { qty: totalQtyItem, total: totalItem },
        $push: {
          orderItems: newItem,
        },
      },
    );

    // Clear dataloader cache
    OrderLoader.clearCache(context, newOrder._id);

    return {
      id: newOrder._id,
      error: null,
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
