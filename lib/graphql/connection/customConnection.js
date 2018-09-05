'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectionArgs = exports.backwardConnectionArgs = exports.forwardConnectionArgs = undefined;
exports.connectionDefinitions = connectionDefinitions;

var _graphql = require('graphql');

/**
 * Returns a GraphQLFieldConfigArgumentMap appropriate to include on a field
 * whose return type is a connection type with forward pagination.
 */
const forwardConnectionArgs = exports.forwardConnectionArgs = {
  after: {
    type: _graphql.GraphQLString
  },
  first: {
    type: _graphql.GraphQLInt
  }
};

/**
 * Returns a GraphQLFieldConfigArgumentMap appropriate to include on a field
 * whose return type is a connection type with backward pagination.
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

const backwardConnectionArgs = exports.backwardConnectionArgs = {
  before: {
    type: _graphql.GraphQLString
  },
  last: {
    type: _graphql.GraphQLInt
  }
};

/**
 * Returns a GraphQLFieldConfigArgumentMap appropriate to include on a field
 * whose return type is a connection type with bidirectional pagination.
 */
const connectionArgs = exports.connectionArgs = {
  ...forwardConnectionArgs,
  ...backwardConnectionArgs
};

function resolveMaybeThunk(thingOrThunk) {
  return typeof thingOrThunk === 'function' ? thingOrThunk() : thingOrThunk;
}

/**
 * Returns a GraphQLObjectType for a connection with the given name,
 * and whose nodes are of the specified type.
 */
function connectionDefinitions(config) {
  const { nodeType } = config;
  const name = config.name || nodeType.name;
  const edgeFields = config.edgeFields || {};
  const connectionFields = config.connectionFields || {};
  const { resolveNode, resolveCursor } = config;
  const edgeType = new _graphql.GraphQLObjectType({
    name: `${name}Edge`,
    description: 'An edge in a connection.',
    fields: () => ({
      node: {
        type: nodeType,
        resolve: resolveNode,
        description: 'The item at the end of the edge'
      },
      cursor: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        resolve: resolveCursor,
        description: 'A cursor for use in pagination'
      },
      ...resolveMaybeThunk(edgeFields)
    })
  });

  const connectionType = new _graphql.GraphQLObjectType({
    name: `${name}Connection`,
    description: 'A connection to a list of items.',
    fields: () => ({
      pageInfo: {
        type: new _graphql.GraphQLNonNull(pageInfoType),
        description: 'Information to aid in pagination.'
      },
      edges: {
        type: new _graphql.GraphQLList(edgeType),
        description: 'A list of edges.'
      },
      ...resolveMaybeThunk(connectionFields)
    })
  });

  return { edgeType, connectionType };
}

/**
 * The common page info type used by all connections.
 */
const pageInfoType = new _graphql.GraphQLObjectType({
  name: 'PageInfo',
  description: 'Information about pagination in a connection.',
  fields: () => ({
    hasNextPage: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLBoolean),
      description: 'When paginating forwards, are there more items?'
    },
    hasPreviousPage: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLBoolean),
      description: 'When paginating backwards, are there more items?'
    },
    startCursor: {
      type: _graphql.GraphQLString,
      description: 'When paginating backwards, the cursor to continue.'
    },
    endCursor: {
      type: _graphql.GraphQLString,
      description: 'When paginating forwards, the cursor to continue.'
    }
  })
});
//# sourceMappingURL=customConnection.js.map