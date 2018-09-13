// @flow

import { GraphQLObjectType } from 'graphql';

// User
import UserAddMutation from './mutation/user/UserAddMutation';
import UserLoginMutation from './mutation/user/UserLoginMutation';

// Product
import ProductAddMutation from './mutation/product/ProductAddMutation';

// Order
import OrderAddMutation from './mutation/order/OrderAddMutation';
import OrderCloseMutation from './mutation/order/OrderCloseMutation';
import OrderItemAddMutation from './mutation/order/OrderItemAddMutation';
import OrderItemEditMutation from './mutation/order/OrderItemEditMutation';
import OrderItemRemoveMutation from './mutation/order/OrderItemRemoveMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // auth
    UserLoginMutation,
    UserAddMutation,
    // Product
    ProductAddMutation,
    // Order
    OrderAddMutation,
    OrderCloseMutation,
    OrderItemAddMutation,
    OrderItemEditMutation,
    OrderItemRemoveMutation,
  }),
});
