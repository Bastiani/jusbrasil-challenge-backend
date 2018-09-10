import { GraphQLString, GraphQLNonNull, GraphQLEnumType } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import OrderModel from '../../../modules/order/OrderModel';
import ProductModel from '../../../modules/product/ProductModel';

import * as OrderLoader from '../../../modules/order/OrderLoader';
import OrderType from '../../../modules/order/OrderType';

import OrderItemFieldsType from '../../../modules/order/OrderItemFieldsType';

export const OPERATION_TYPE = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
};

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

    const orderItem = await OrderModel.findOne(
      { _id: fromGlobalId(orderId).id },
      { orderItems: { $elemMatch: { product: fromGlobalId(product).id } } },
    );

    const totalQtyItem = operation === OPERATION_TYPE.ADD ? orderItem.orderItems[0].qty + qty : orderItem.orderItems[0].qty - qty;
    const totalValueItem = productValue * totalQtyItem;
    const totalValueOrder = operation === OPERATION_TYPE.ADD ? orderTotal + productValue * qty : orderTotal - productValue * qty;
    const totalQtyOrder = operation === OPERATION_TYPE.ADD ? orderQty + qty : orderQty - qty;
    const totalQtyProduct = operation === OPERATION_TYPE.ADD ? productQty - qty : productQty + qty;

    await ProductModel.findOneAndUpdate(
      {
        _id: fromGlobalId(product).id,
      },
      {
        $set: { qty: totalQtyProduct },
      },
    );

    await OrderModel.findOneAndUpdate(
      {
        $and: [{ _id: fromGlobalId(orderId).id, 'orderItems.product': fromGlobalId(product).id }],
      },
      {
        $set: {
          qty: totalQtyOrder,
          total: totalValueOrder,
          'orderItems.$.qty': totalQtyItem,
          'orderItems.$.total': totalValueItem,
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
      resolve: async ({ id }, args, context) => OrderLoader.load(context, id),
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});

export default mutation;
