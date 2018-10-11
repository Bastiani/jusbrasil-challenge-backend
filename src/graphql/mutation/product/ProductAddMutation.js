import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import Product from '../../../modules/product/ProductModel';

import * as ProductLoader from '../../../modules/product/ProductLoader';
import ProductType, { ProductConnection } from '../../../modules/product/ProductType';
import { ProductInputType } from '../../../modules/product/ProductInputType';
import pubSub, { EVENTS } from '../../pubSub';

const mutation = mutationWithClientMutationId({
  name: 'ProductAdd',
  inputFields: {
    ...ProductInputType,
  },
  mutateAndGetPayload: async args => {
    const { description, value, qty, picture, active } = args;

    const product = await new Product({
      description,
      value,
      qty,
      picture,
      active,
    }).save();

    await pubSub.publish(EVENTS.PRODUCT.ADDED, { ProductAdded: { product } });

    return {
      id: product._id,
      error: null,
    };
  },
  outputFields: {
    productEdge: {
      type: ProductConnection.edgeType,
      resolve: async ({ id }, args, context) => {
        const product = await ProductLoader.load(context, id);

        // Returns null if no node was loaded
        if (!product) {
          return null;
        }

        return {
          cursor: toGlobalId('Order', product._id),
          node: product,
        };
      },
    },
    product: {
      type: ProductType,
      resolve: async ({ id: productId }, args, context) => {
        const product = await ProductLoader.load(context, productId);

        if (!product) {
          return null;
        }

        return product;
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});

export default mutation;
