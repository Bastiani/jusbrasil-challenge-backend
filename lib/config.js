'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const graphqlPort = exports.graphqlPort = process.env.GRAPHQL_PORT || 5000;
const jwtSecret = exports.jwtSecret = process.env.JWT_KEY || 'secret_key';
//# sourceMappingURL=config.js.map