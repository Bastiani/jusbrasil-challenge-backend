'use strict';

var _http = require('http');

var _subscriptionsTransportWs = require('subscriptions-transport-ws');

var _graphql = require('graphql');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

var _config = require('./config');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  try {
    const info = await (0, _database2.default)();
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }

  const server = (0, _http.createServer)(_app2.default.callback());

  await _app2.default.listen(_config.graphqlPort, () => {
    _subscriptionsTransportWs.SubscriptionServer.create({
      onConnect: connectionParams => console.log('client subscription connected!', connectionParams),
      onDisconnect: () => console.log('client subscription disconnected!'),
      execute: _graphql.execute,
      subscribe: _graphql.subscribe,
      schema: _schema2.default
    }, {
      server,
      path: '/subscriptions'
    });
  });
  console.log(`Server started on port ${_config.graphqlPort}`);
})();
/* eslint-disable no-console */
//# sourceMappingURL=index.js.map