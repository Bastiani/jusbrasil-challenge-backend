'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _QueryType = require('./graphql/QueryType');

var _QueryType2 = _interopRequireDefault(_QueryType);

var _MutationType = require('./graphql/MutationType');

var _MutationType2 = _interopRequireDefault(_MutationType);

var _SubscriptionType = require('./graphql/SubscriptionType');

var _SubscriptionType2 = _interopRequireDefault(_SubscriptionType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = new _graphql.GraphQLSchema({
  query: _QueryType2.default,
  mutation: _MutationType2.default,
  subscription: _SubscriptionType2.default
});

exports.default = schema;
//# sourceMappingURL=schema.js.map