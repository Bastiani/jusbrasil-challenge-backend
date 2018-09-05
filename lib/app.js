'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaGraphql = require('koa-graphql');

var _koaGraphql2 = _interopRequireDefault(_koaGraphql);

var _koaCors = require('koa-cors');

var _koaCors2 = _interopRequireDefault(_koaCors);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _language = require('graphql/language');

var _graphqlPlaygroundMiddleware = require('graphql-playground-middleware');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _loader = require('./graphql/loader');

var loaders = _interopRequireWildcard(_loader);

var _helper = require('./helper');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
const app = new _koa2.default();
const router = new _koaRouter2.default();

const graphqlSettingsPerReq = async req => {
  const dataloaders = await (0, _helper.getDataloaders)(loaders);
  const { user } = await (0, _helper.getUser)(dataloaders, req.header.authorization);

  return {
    graphiql: process.env.NODE_ENV !== 'production',
    schema: _schema2.default,
    pretty: true,
    context: {
      user,
      req,
      dataloaders
    },
    extensions: ({ document, variables, operationName, result }) => {
      console.log((0, _language.print)(document));
      console.log(variables);
      console.log(operationName, result);
    },
    formatError: error => {
      console.log(error.message);
      console.log(error.locations);
      console.log(error.stack);

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack
      };
    }
  };
};

const graphqlServer = (0, _koaConvert2.default)((0, _koaGraphql2.default)(graphqlSettingsPerReq));

app.use((0, _koaCors2.default)());

router.all('/graphql', graphqlServer);
router.all('/playground', (0, _graphqlPlaygroundMiddleware.koaPlayground)({
  endpoint: '/graphql'
}));

app.use(router.routes()).use(router.allowedMethods());

exports.default = app;
//# sourceMappingURL=app.js.map