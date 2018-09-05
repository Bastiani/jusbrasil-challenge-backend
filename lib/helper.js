'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataloaders = exports.getUser = undefined;
exports.generateToken = generateToken;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('./config');

var _UserLoader = require('./modules/user/UserLoader');

var UserLoader = _interopRequireWildcard(_UserLoader);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Return user and seller given a JWT token
 * @param token - jwt token with userId
 * @returns {*}
 */
const getUser = exports.getUser = async (dataloaders, token) => {
  if (!token) {
    return { user: null };
  }

  try {
    const decodedToken = _jsonwebtoken2.default.verify(token.replace('JWT', '').trim(), _config.jwtSecret);
    const user = await UserLoader.load({ dataloaders }, decodedToken.id);

    if (!user) {
      return { user: null };
    }

    return { user };
  } catch (err) {
    return { user: null };
  }
};

// $FlowFixMe

const getDataloaders = exports.getDataloaders = loaders => Object.keys(loaders).reduce((prev, loaderKey) => ({
  ...prev,
  [loaderKey]: loaders[loaderKey].getLoader ? loaders[loaderKey].getLoader() : undefined
}), {});

function generateToken(user) {
  return `JWT ${_jsonwebtoken2.default.sign({ id: user._id }, _config.jwtSecret)}`;
}
//# sourceMappingURL=helper.js.map