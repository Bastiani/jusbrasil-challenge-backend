import { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLBoolean } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import Product from '../../../modules/product/ProductModel';

import * as ProductLoader from '../../../modules/product/ProductLoader';
import ProductType from '../../../modules/product/ProductType';

const mutation = mutationWithClientMutationId({
  name: 'ProductAdd',
  inputFields: {
    description: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Description of the product',
    },
    value: {
      type: GraphQLNonNull(GraphQLString),
      description: 'Value of the product',
    },
    qty: {
      type: GraphQLInt,
      description: 'Quantity of the product',
    },
    picture: {
      type: GraphQLNonNull(GraphQLString),
      description: 'URL of the product',
    },
    active: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: 'Active of the product',
    },
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
