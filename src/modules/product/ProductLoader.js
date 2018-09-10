// @flow
import DataLoader from 'dataloader';
import type { ConnectionArguments } from 'graphql-relay';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import type { ObjectId } from 'mongoose';

import type { GraphQLContext, ProductFlowType } from '../../flow';

import ProductModel from './ProductModel';

type Args = {
  search: string,
};

export default class Product {
  id: string;

  _id: string;

  description: string;

  value: number;

  qty: number;

  picture: string;

  active: boolean;

  constructor(data: ProductFlowType) {
    this.id = data.id;
    this._id = data._id;
    this.description = data.description;
    this.value = data.value;
    this.qty = data.qty;
    this.picture = data.picture;
    this.active = data.active;
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(ProductModel, ids));

const viewerCanSee = (context, data) => true;

export const load = async (context: GraphQLContext, id: ObjectId): Promise<?Product> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.ProductLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee(context, data) ? new Product(data) : null;
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: ObjectId) => dataloaders.ProductLoader.clear(id.toString());

export const loadProducts = async (context: GraphQLContext, args: ConnectionArguments & Args) => {
  const { search } = args;
  const conditions = {
    ...(search != null ? { description: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {}),
  };

  const products = ProductModel.find(conditions).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: products,
    context,
    args,
    loader: load,
  });
};
