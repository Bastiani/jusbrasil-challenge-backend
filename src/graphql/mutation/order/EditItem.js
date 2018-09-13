// @flow
import { fromGlobalId } from 'graphql-relay';

import OrderModel from '../../../modules/order/OrderModel';
import ProductModel from '../../../modules/product/ProductModel';

export const OPERATION_TYPE = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
};

const EditItem = async (orderId: string, product: string, qty: number, operation) => {
  try {
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

    const orderItem = await OrderModel.findOne(
      { _id: fromGlobalId(orderId).id },
      { orderItems: { $elemMatch: { product: fromGlobalId(product).id } } },
    );

    const totalQtyItem = operation === OPERATION_TYPE.ADD ? orderItem.orderItems[0].qty + qty : orderItem.orderItems[0].qty - qty;
    if (totalQtyItem > productQty) throw new Error('Item esgotado!');
    const totalValueItem = productValue * totalQtyItem;
    const totalValueOrder = operation === OPERATION_TYPE.ADD ? orderTotal + productValue * qty : orderTotal - productValue * qty;
    const totalQtyOrder = operation === OPERATION_TYPE.ADD ? orderQty + qty : orderQty - qty;

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
    return { message: null };
  } catch (error) {
    return error;
  }
};

export default EditItem;
