'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _UserModel = require('../../../modules/user/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _helper = require('../../../helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'UserLogin',
  inputFields: {
    email: {
      type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLString)
    },
    password: {
      type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ email, password }) => {
    if (!email || !password) {
      return {
        token: null,
        error: 'Email ou senha inválidos'
      };
    }

    const user = await _UserModel2.default.findOne({
      email: email.toLowerCase()
    });

    if (!user) {
      return {
        token: null,
        error: 'Email ou senha inválidos'
      };
    }

    if (!user.password) {
      return {
        token: null,
        error: 'Email ou senha inválidos'
      };
    }

    let correctPassword = null;
    try {
      correctPassword = await user.authenticate(password);
    } catch (err) {
      return {
        token: null,
        error: 'Email ou senha inválidos'
      };
    }

    if (!correctPassword) {
      return {
        token: null,
        error: 'Email ou senha inválidos'
      };
    }

    const token = (0, _helper.generateToken)(user);

    return {
      token,
      error: null
    };
  },
  outputFields: {
    token: {
      type: _graphql.GraphQLString,
      resolve: ({ token }) => token
    },
    error: {
      type: _graphql.GraphQLString,
      resolve: ({ error }) => error
    }
  }
});
//# sourceMappingURL=UserLoginMutation.js.map