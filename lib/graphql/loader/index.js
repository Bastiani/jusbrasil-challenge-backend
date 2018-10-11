'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderLoader = exports.ProductLoader = exports.UserLoader = undefined;

var _UserLoader2 = require('../../modules/user/UserLoader');

var _UserLoader = _interopRequireWildcard(_UserLoader2);

var _ProductLoader2 = require('../../modules/product/ProductLoader');

var _ProductLoader = _interopRequireWildcard(_ProductLoader2);

var _OrderLoader2 = require('../../modules/order/OrderLoader');

var _OrderLoader = _interopRequireWildcard(_OrderLoader2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.UserLoader = _UserLoader;
exports.ProductLoader = _ProductLoader;
exports.OrderLoader = _OrderLoader;
//# sourceMappingURL=index.js.map