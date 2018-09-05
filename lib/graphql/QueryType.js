'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _UserType = require('../modules/user/UserType');

var _UserType2 = _interopRequireDefault(_UserType);

var _Node = require('../interface/Node');

var _UserLoader = require('../modules/user/UserLoader');

var UserLoader = _interopRequireWildcard(_UserLoader);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: _Node.nodeField,
    me: {
      type: _UserType2.default,
      description: 'Me is the logged user',
      resolve: async (root, args, context) => UserLoader.load(context, context.user && context.user.id)
    },
    users: {
      type: (0, _graphql.GraphQLNonNull)(_UserType.UserConnection.connectionType),
      args: {
        ..._graphqlRelay.connectionArgs,
        search: {
          type: _graphql.GraphQLString
        }
      },
      resolve: async (obj, args, context) => await UserLoader.loadUsers(context, args)
    }
  })
});
//# sourceMappingURL=QueryType.js.map