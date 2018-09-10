// @flow
import DataLoader from 'dataloader';
import type { ConnectionArguments } from 'graphql-relay';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';

import type { GraphQLContext, OrderFlowType } from '../../flow';

import OrderModel from './OrderModel';

import OrderItemType from './OrderItemType';

type Args = {};

export default class Order {
  id: string;

  _id: string;

  orderItems: Array<OrderItemType>;

  qty: number;

  total: number;

  constructor(data: OrderFlowType) {
    this.id = data.id;
    this._id = data._id;
    this.orderItems = data.orderItems;
    this.qty = data.qty;
    this.total = data.total;
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(OrderModel, ids));

const viewerCanSee = (context, data) => true;

export const load = async (context: GraphQLContext, id: string): Promise<?Order> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.OrderLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee(context, data) ? new Order(data) : null;
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: string) => dataloaders.OrderLoader.clear(id.toString());

export const loadOrders = async (context: GraphQLContext, args: ConnectionArguments & Args) => {
  const orders = OrderModel.find().sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: orders,
    context,
    args,
    loader: load,
  });
};
