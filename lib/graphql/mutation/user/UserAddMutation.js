'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _UserModel = require('../../../modules/user/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _UserLoader = require('../../../modules/user/UserLoader');

var UserLoader = _interopRequireWildcard(_UserLoader);

var _UserType = require('../../../modules/user/UserType');

var _UserType2 = _interopRequireDefault(_UserType);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mutation = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'UserAdd',
  inputFields: {
    name: {
      type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLString)
    },
    password: {
      type: _graphql.GraphQLString
    },
    email: {
      type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLString)
    },
    active: {
      type: _graphql.GraphQLBoolean
    }
  },
  mutateAndGetPayload: async args => {
    const { name, password, email, active } = args;

    const newUser = await new _UserModel2.default({
      name,
      password,
      email,
      active
    }).save();

    return {
      id: newUser._id,
      error: null
    };
  },
  outputFields: {
    user: {
      type: _UserType2.default,
      resolve: async ({ id }, args, context) => {
        const newUser = await UserLoader.load(context, id);

        if (!newUser) {
          return null;
        }

        return newUser;
      }
    },
    error: {
      type: _graphql.GraphQLString,
      resolve: ({ error }) => error
    }
  }
});

exports.default = mutation;
//# sourceMappingURL=UserAddMutation.js.map