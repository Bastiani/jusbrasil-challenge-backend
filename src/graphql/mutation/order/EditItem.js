// @flow
import { fromGlobalId } from 'graphql-relay';

import OrderModel from '../../../modules/order/OrderModel';
import ProductModel from '../../../modules/product/ProductModel';

const EditItem = async (orderId: string, product: string, qty: number) => {
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

    const orderItemQty = orderItem.orderItems[0].qty;
    const orderItemValue = orderItem.orderItems[0].total;

    if (qty > productQty || qty <= 0) throw new Error('Quantidade invalida!');
    const totalValueItem = productValue * qty;
    const totalValueOrder = orderTotal - orderItemValue + totalValueItem;

    const totalQtyOrder = orderQty - orderItemQty + qty;

    await OrderModel.findOneAndUpdate(
      {
        $and: [{ _id: fromGlobalId(orderId).id, 'orderItems.product': fromGlobalId(product).id }],
      },
      {
        $set: {
          qty: totalQtyOrder,
          total: totalValueOrder,
          'orderItems.$.qty': qty,
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
