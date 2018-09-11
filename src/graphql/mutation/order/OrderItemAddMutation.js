import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import OrderModel from '../../../modules/order/OrderModel';

import * as OrderLoader from '../../../modules/order/OrderLoader';
import OrderType from '../../../modules/order/OrderType';

import OrderItemFieldsType from '../../../modules/order/OrderItemFieldsType';

import AddItem from './AddItem';
import EditItem, { OPERATION_TYPE } from './EditItem';

const mutation = mutationWithClientMutationId({
  name: 'OrderItemAdd',
  inputFields: {
    ...OrderItemFieldsType,
  },
  mutateAndGetPayload: async (args, context) => {
    const { orderId, product, qty } = args;

    // Check if the provided ID is valid
    const order = await OrderModel.findOne({
      _id: fromGlobalId(orderId).id,
    });

    // If not, throw an error
    if (!order) {
      throw new Error('Invalid orderId');
    }

    const orderWithItem = await OrderModel.findOne({
      $and: [{ _id: fromGlobalId(orderId).id, 'orderItems.product': fromGlobalId(product).id }],
    });

    if (orderWithItem) {
      const { message } = await EditItem(orderId, product, qty, OPERATION_TYPE.ADD);
      if (message) throw new Error('Error while editing item');
    } else {
      const { qty: orderQty, total: orderTotal } = order;

      const newItem = await AddItem(product, qty);
      const { total: totalItem } = newItem;

      const totalValueOrder = orderTotal + totalItem;
      const totalQtyOrder = orderQty + qty;

      await OrderModel.findOneAndUpdate(
        {
          _id: order._id,
        },
        {
          $set: { qty: totalQtyOrder, total: totalValueOrder },
          $push: {
            orderItems: newItem,
          },
        },
      );
    }

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
