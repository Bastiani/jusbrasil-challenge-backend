// @flow
import DataLoader from 'dataloader';

import type { ConnectionArguments } from 'graphql-relay';

import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';

import type { GraphQLContext, UserFlowType } from '../../flow';

import UserModel from './UserModel';

type Args = {
  search: string,
};

export default class User {
  id: string;

  _id: string;

  name: string;

  email: string;

  active: boolean;

  isAdmin: boolean;

  constructor(data: UserFlowType) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.email = data.email;
    this.active = data.active;
    this.isAdmin = data.isAdmin;
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(UserModel, ids));

const viewerCanSee = (context, data) => true;

export const load = async (context: GraphQLContext, id: string): Promise<?User> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.UserLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee(context, data) ? new User(data) : null;
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: string) => dataloaders.UserLoader.clear(id.toString());

export const loadUsers = async (context: GraphQLContext, args: ConnectionArguments & Args) => {
  const { user } = context;
  if (!user) throw new Error('Unauthorized user');
  const { search } = args;
  const conditions = {
    ...(search != null ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {}),
  };

  const users = UserModel.find(conditions).sort({ createdAt: -1 });

  return connectionFromMongoCursor({
    cursor: users,
    context,
    args,
    loader: load,
  });
};
