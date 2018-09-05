'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeInterface = exports.nodeField = undefined;
exports.registerType = registerType;

var _graphqlRelay = require('graphql-relay');

const registeredTypes = {};
function registerType(type) {
  registeredTypes[type.name] = type;
  return type;
}

const { nodeField, nodeInterface } = (0, _graphqlRelay.nodeDefinitions)((globalId, context) => {
  const { type, id } = (0, _graphqlRelay.fromGlobalId)(globalId);
  const loader = context.dataloaders[`${type}Loader`];
  return loader && loader.load(id) || null;
}, object => registeredTypes[object.constructor.name] || null);
exports.nodeField = nodeField;
exports.nodeInterface = nodeInterface;
//# sourceMappingURL=Node.js.map