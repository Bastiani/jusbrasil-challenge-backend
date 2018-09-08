// @flow
import type Dataloader from 'dataloader';
import type { ObjectId } from 'mongoose';

import User from '../modules/user/UserLoader';
import Product from '../modules/product/ProductLoader';
import Order from '../modules/order/OrderLoader';

export type DataLoaderKey = ObjectId | string;

export type Dataloaders = {
  UserLoader: Dataloader<DataLoaderKey, User>,
  ProductLoader: Dataloader<DataLoaderKey, Product>,
  OrderLoader: Dataloader<DataLoaderKey, Order>,
};
