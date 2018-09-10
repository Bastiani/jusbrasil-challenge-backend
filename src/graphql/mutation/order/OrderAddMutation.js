import { GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import Order from '../../../modules/order/OrderModel';

import * as OrderLoader from '../../../modules/order/OrderLoader';
import OrderType from '../../../modules/order/OrderType';

const mutation = mutationWithClientMutationId({
  name: 'OrderAdd',
  inputFields: {
    qty: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'Quantity of the order',
    },
  },
  mutateAndGetPayload: async args => {
    const { qty } = args;

    const newOrder = await new Order({
      qty,
    }).save();

    return {
      id: newOrder._id,
      error: null,
    };
  },
  outputFields: {
    order: {
      type: OrderType,
      resolve: async ({ id: orderId }, args, context) => {
        const newOrder = await OrderLoader.load(context, orderId);

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
