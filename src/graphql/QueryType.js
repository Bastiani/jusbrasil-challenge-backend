// @flow
import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
import { connectionArgs, fromGlobalId } from 'graphql-relay';

import UserType, { UserConnection } from '../modules/user/UserType';
import ProductType, { ProductConnection } from '../modules/product/ProductType';
import OrderType, { OrderConnection } from '../modules/order/OrderType';
import { nodeField } from '../interface/Node';

import * as UserLoader from '../modules/user/UserLoader';
import * as ProductLoader from '../modules/product/ProductLoader';
import * as OrderLoader from '../modules/order/OrderLoader';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: nodeField,
    me: {
      type: UserType,
      description: 'Me is the logged user',
      resolve: async (root, args, context) => UserLoader.load(context, context.user && context.user.id),
    },
    users: {
      type: GraphQLNonNull(UserConnection.connectionType),
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: async (obj, args, context) => await UserLoader.loadUsers(context, args),
    },
    product: {
      type: ProductType,
      description: 'Get product',
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (root, { id }, context) => ProductLoader.load(context, fromGlobalId(id).id),
    },
    products: {
      type: GraphQLNonNull(ProductConnection.connectionType),
      description: 'Find Products',
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: async (obj, args, context) => await ProductLoader.loadProducts(context, args),
    },
    order: {
      type: OrderType,
      description: 'Get order',
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (root, { id }, context) => OrderLoader.load(context, fromGlobalId(id).id),
    },
    orders: {
      type: GraphQLNonNull(OrderConnection.connectionType),
      description: 'Get orders',
      args: {
        ...connectionArgs,
        active: {
          type: GraphQLBoolean,
        },
      },
      resolve: async (root, args, context) => OrderLoader.loadOrders(context, args),
    },
  }),
});
