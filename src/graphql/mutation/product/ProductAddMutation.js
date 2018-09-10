import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import Product from '../../../modules/product/ProductModel';

import * as ProductLoader from '../../../modules/product/ProductLoader';
import ProductType from '../../../modules/product/ProductType';
import { ProductInputType } from '../../../modules/product/ProductInputType';

const mutation = mutationWithClientMutationId({
  name: 'ProductAdd',
  inputFields: {
    ...ProductInputType,
  },
  mutateAndGetPayload: async args => {
    const { description, value, qty, picture, active } = args;

    const newProduct = await new Product({
      description,
      value,
      qty,
      picture,
      active,
    }).save();

    return {
      id: newProduct._id,
      error: null,
    };
  },
  outputFields: {
    product: {
      type: ProductType,
      resolve: async ({ id: productId }, args, context) => {
        const newProduct = await ProductLoader.load(context, productId);

        if (!newProduct) {
          return null;
        }

        return newProduct;
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});

export default mutation;
