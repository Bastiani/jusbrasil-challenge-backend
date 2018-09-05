'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserConnection = undefined;

var _graphql = require('graphql');

var _customConnection = require('../../graphql/connection/customConnection');

var _Node = require('../../interface/Node');

const UserType = (0, _Node.registerType)(new _graphql.GraphQLObjectType({
  name: 'User',
  description: 'User type definition',
  fields: () => ({
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
      description: 'ID of the user'
    },
    name: {
      type: _graphql.GraphQLString,
      description: 'Name of the user'
    },
    password: {
      type: _graphql.GraphQLString,
      description: 'Password of the user'
    },
    email: {
      type: _graphql.GraphQLString,
      description: 'Email of the user'
    },
    active: {
      type: _graphql.GraphQLBoolean,
      description: 'Active of the user'
    },
    isAdmin: {
      type: _graphql.GraphQLBoolean,
      description: 'isAdmin of the user'
    }
  }),
  interfaces: () => [_Node.nodeInterface]
}));

const UserConnection = exports.UserConnection = (0, _customConnection.connectionDefinitions)({
  name: 'User',
  nodeType: (0, _graphql.GraphQLNonNull)(UserType)
});

exports.default = UserType;
//# sourceMappingURL=UserType.js.map