import { GraphQLObjectType } from 'graphql';
import { offsetToCursor } from 'graphql-relay';

import { ProductConnection } from '../../../modules/product/ProductType';

import pubSub, { EVENTS } from '../../pubSub';

const ProductAddedPayloadType = new GraphQLObjectType({
  name: 'ProductAddedPayload',
  fields: () => ({
    productEdge: {
      type: ProductConnection.edgeType,
      resolve: ({ product }) => ({
        cursor: offsetToCursor(product.id),
        node: product,
      }),
    },
  }),
});

const productAdded = {
  type: ProductAddedPayloadType,
  subscribe: () => pubSub.asyncIterator(EVENTS.PRODUCT.ADDED),
};

export default productAdded;
