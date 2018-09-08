// @flow

import { GraphQLObjectType } from 'graphql';

// User
import UserAddMutation from './mutation/user/UserAddMutation';
import UserLoginMutation from './mutation/user/UserLoginMutation';

// Product
import ProductAddMutation from './mutation/product/ProductAddMutation';
import OrderAddMutation from './mutation/order/OrderAddMutation';
import OrderItemAddMutation from './mutation/order/OrderItemAddMutation';
import OrderItemEditMutation from './mutation/order/OrderItemEditMutation';

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
    OrderItemAddMutation,
    OrderItemEditMutation,
  }),
});
