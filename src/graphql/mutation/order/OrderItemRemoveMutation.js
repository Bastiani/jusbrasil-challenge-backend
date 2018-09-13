import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId, fromGlobalId } from 'graphql-relay';

import * as OrderLoader from '../../../modules/order/OrderLoader';
import { OrderConnection } from '../../../modules/order/OrderType';
import OrderModel from '../../../modules/order/OrderModel';

import OrderItemFieldsType from '../../../modules/order/OrderItemFieldsType';

const { qty, ...orderItemFieldsType } = OrderItemFieldsType;

const mutation = mutationWithClientMutationId({
  name: 'OrderItemRemove',
  inputFields: {
    ...orderItemFieldsType,
  },
  mutateAndGetPayload: async (args, context) => {
    const { orderId, product } = args;

    // Check if the provided ID is valid
    const order = await OrderModel.findOne({
      _id: fromGlobalId(orderId).id,
    });

    // If not, throw an error
    if (!order) {
      throw new Error('Invalid orderId');
    }

    const orderItem = await OrderModel.findOne(
      { _id: fromGlobalId(orderId).id },
      { orderItems: { $elemMatch: { product: fromGlobalId(product).id } } },
    );

    const { qty: orderQty, total: orderTotal } = order;

    const totalQtyItem = orderItem.orderItems[0].qty;
    const totalValueItem = orderItem.orderItems[0].total;

    const totalValueOrder = orderTotal - totalValueItem;
    const totalQtyOrder = orderQty - totalQtyItem;

    await OrderModel.update(
      {
        _id: fromGlobalId(orderId).id,
      },
      {
        $set: {
          qty: totalQtyOrder,
          total: totalValueOrder,
        },
        $pull: {
          orderItems: { product: fromGlobalId(product).id },
        },
      },
    );

    // Clear dataloader cache
    OrderLoader.clearCache(context, orderId);

    return {
      id: orderId,
      error: null,
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
