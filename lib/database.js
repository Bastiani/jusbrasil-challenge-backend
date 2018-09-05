'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectDatabase;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connectDatabase() {
  return new Promise((resolve, reject) => {
    _mongoose2.default.Promise = global.Promise;
    _mongoose2.default.connection.on('error', error => reject(error)).on('close', () => console.log('Database connection closed.')).once('open', () => resolve(_mongoose2.default.connections[0]));

    _mongoose2.default.connect('mongodb://localhost/nodejs-login-boilerplate');
  });
} /* eslint-disable no-console */
//# sourceMappingURL=database.js.map