import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import Order from '../../../modules/order/OrderModel';

import * as OrderLoader from '../../../modules/order/OrderLoader';
import OrderType from '../../../modules/order/OrderType';

import OrderFieldsType from '../../../modules/order/OrderFieldsType';

const { id, ...orderInput } = OrderFieldsType;

const mutation = mutationWithClientMutationId({
  name: 'OrderAdd',
  inputFields: {
    ...orderInput,
  },
  mutateAndGetPayload: async args => {
    const { qty, total } = args;

    const newOrder = await new Order({
      qty,
      total,
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
