'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _UserAddMutation = require('./mutation/user/UserAddMutation');

var _UserAddMutation2 = _interopRequireDefault(_UserAddMutation);

var _UserLoginMutation = require('./mutation/user/UserLoginMutation');

var _UserLoginMutation2 = _interopRequireDefault(_UserLoginMutation);

var _ProductAddMutation = require('./mutation/product/ProductAddMutation');

var _ProductAddMutation2 = _interopRequireDefault(_ProductAddMutation);

var _OrderAddMutation = require('./mutation/order/OrderAddMutation');

var _OrderAddMutation2 = _interopRequireDefault(_OrderAddMutation);

var _OrderCloseMutation = require('./mutation/order/OrderCloseMutation');

var _OrderCloseMutation2 = _interopRequireDefault(_OrderCloseMutation);

var _OrderItemAddMutation = require('./mutation/order/OrderItemAddMutation');

var _OrderItemAddMutation2 = _interopRequireDefault(_OrderItemAddMutation);

var _OrderItemEditMutation = require('./mutation/order/OrderItemEditMutation');

var _OrderItemEditMutation2 = _interopRequireDefault(_OrderItemEditMutation);

var _OrderItemRemoveMutation = require('./mutation/order/OrderItemRemoveMutation');

var _OrderItemRemoveMutation2 = _interopRequireDefault(_OrderItemRemoveMutation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Product


// User
exports.default = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // auth
    UserLoginMutation: _UserLoginMutation2.default,
    UserAddMutation: _UserAddMutation2.default,
    // Product
    ProductAddMutation: _ProductAddMutation2.default,
    // Order
    OrderAddMutation: _OrderAddMutation2.default,
    OrderCloseMutation: _OrderCloseMutation2.default,
    OrderItemAddMutation: _OrderItemAddMutation2.default,
    OrderItemEditMutation: _OrderItemEditMutation2.default,
    OrderItemRemoveMutation: _OrderItemRemoveMutation2.default
  })
});

// Order
//# sourceMappingURL=MutationType.js.map