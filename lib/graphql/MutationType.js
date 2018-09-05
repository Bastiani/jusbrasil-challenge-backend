'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _UserAddMutation = require('./mutation/user/UserAddMutation');

var _UserAddMutation2 = _interopRequireDefault(_UserAddMutation);

var _UserLoginMutation = require('./mutation/user/UserLoginMutation');

var _UserLoginMutation2 = _interopRequireDefault(_UserLoginMutation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // auth
    UserLoginMutation: _UserLoginMutation2.default,
    UserAddMutation: _UserAddMutation2.default
  })
});
//# sourceMappingURL=MutationType.js.map