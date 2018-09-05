// @flow

import { GraphQLObjectType } from 'graphql';

import UserAddMutation from './mutation/user/UserAddMutation';
import UserLoginMutation from './mutation/user/UserLoginMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // auth
    UserLoginMutation,
    UserAddMutation,
  }),
});
