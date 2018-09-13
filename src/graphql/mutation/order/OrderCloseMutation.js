import { GraphQLString, GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import OrderModel from '../../../modules/order/OrderModel';
import ProductModel from '../../../modules/product/ProductModel';

import * as OrderLoader from '../../../modules/order/OrderLoader';
import OrderType from '../../../modules/order/OrderType';

const mutation = mutationWithClientMutationId({
  name: 'OrderClose',
  inputFields: {
    id: {
      type: GraphQLNonNull(GraphQLString),
      description: 'id of the order',
    },
    active: {
      type: GraphQLBoolean,
      description: 'Active of the order',
    },
  },
  mutateAndGetPayload: async (args, context) => {
    const { id, active } = args;

    // Check if the provided ID is valid
    const order = await OrderModel.findOne({ _id: fromGlobalId(id).id }, { orderItems: 1 });

    // If not, throw an error
    if (!order) {
      throw new Error('Invalid orderId');
    }

    order.orderItems.map(async ({ product, qty }) => {
      // find product and adjust quantity in stock
      await ProductModel.findById(product, (err, item) => {
        if (err) throw new Error(err);
        item.qty -= qty;
        item.save();
      });
    });

    await order.update({
      active,
    });

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
      resolve: async ({ id }, args, context) => {
        const newOrder = await OrderLoader.load(context, id);

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
