import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import OrderModel from '../../../modules/order/OrderModel';
import ProductModel from '../../../modules/product/ProductModel';

import * as OrderLoader from '../../../modules/order/OrderLoader';
import OrderType from '../../../modules/order/OrderType';

import OrderItemFieldsType, { OPERATION_TYPE } from '../../../modules/order/OrderItemFieldsType';

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

    // Check if the provided ID is valid
    const productSelected = await ProductModel.findOne({
      _id: fromGlobalId(product).id,
    });

    // If not, throw an error
    if (!productSelected) {
      throw new Error('Invalid product');
    }

    const { qty: productQty, value: productValue } = productSelected;
    const { qty: orderQty, total: orderTotal } = order;

    if (qty > productQty) throw new Error('Quantity is invalid');

    const totalValueItem = productValue * qty;
    const totalValueOrder = orderTotal + totalValueItem;
    const totalQtyOrder = orderQty + qty;

    const orderItem = {
      product: fromGlobalId(product).id,
      qty,
      total: totalValueItem,
    };

    // await ProductModel.findOneAndUpdate(
    //   {
    //     _id: productSelected._id,
    //   },
    //   {
    //     $set: { qty: productQty - qty },
    //   },
    // );

    await OrderModel.findOneAndUpdate(
      {
        _id: order._id,
      },
      {
        $set: { qty: totalQtyOrder, total: totalValueOrder },
        $push: {
          orderItems: orderItem,
        },
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
