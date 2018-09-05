import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';

import { connectionDefinitions } from '../../graphql/connection/customConnection';

import type { GraphQLContext } from '../../flow/GraphQLContext';

import { registerType, nodeInterface } from '../../interface/Node';

import type { User } from './UserLoader';

const UserType = registerType(
  new GraphQLObjectType(
    ({
      name: 'User',
      description: 'User type definition',
      fields: () => ({
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'ID of the user',
        },
        name: {
          type: GraphQLString,
          description: 'Name of the user',
        },
        password: {
          type: GraphQLString,
          description: 'Password of the user',
        },
        email: {
          type: GraphQLString,
          description: 'Email of the user',
        },
        active: {
          type: GraphQLBoolean,
          description: 'Active of the user',
        },
        isAdmin: {
          type: GraphQLBoolean,
          description: 'isAdmin of the user',
        },
      }),
      interfaces: () => [nodeInterface],
    }: GraphQLObjectTypeConfig<User, GraphQLContext>),
  ),
);

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: GraphQLNonNull(UserType),
});

export default UserType;
