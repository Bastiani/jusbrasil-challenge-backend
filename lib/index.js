'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  try {
    const info = await (0, _database2.default)();
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }

  await _app2.default.listen(_config.graphqlPort);
  console.log(`Server started on port ${_config.graphqlPort}`);
})();
/* eslint-disable no-console */
//# sourceMappingURL=index.js.map