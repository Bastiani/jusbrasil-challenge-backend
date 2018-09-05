import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import User from '../../../modules/user/UserModel';

import * as UserLoader from '../../../modules/user/UserLoader';
import UserType from '../../../modules/user/UserType';

const mutation = mutationWithClientMutationId({
  name: 'UserAdd',
  inputFields: {
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    active: {
      type: GraphQLBoolean,
    },
  },
  mutateAndGetPayload: async args => {
    const { name, password, email, active } = args;

    const newUser = await new User({
      name,
      password,
      email,
      active,
    }).save();

    return {
      id: newUser._id,
      error: null,
    };
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: async ({ id }, args, context) => {
        const newUser = await UserLoader.load(context, id);

        if (!newUser) {
          return null;
        }

        return newUser;
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});

export default mutation;
