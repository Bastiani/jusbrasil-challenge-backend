import { fromGlobalId } from 'graphql-relay';

import ProductModel from '../../../modules/product/ProductModel';

const AddItem = async (product, qty) => {
  // Check if the provided ID is valid
  const productSelected = await ProductModel.findOne({
    _id: fromGlobalId(product).id,
  });

  // If not, throw an error
  if (!productSelected) {
    throw new Error('Invalid product');
  }

  const { qty: productQty, value: productValue } = productSelected;

  if (qty > productQty) throw new Error('Quantity is invalid');

  const totalValueItem = productValue * qty;

  return {
    product: fromGlobalId(product).id,
    qty,
    total: totalValueItem,
  };
};

export default AddItem;
