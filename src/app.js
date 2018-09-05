// @flow
/* eslint-disable no-console */
import Koa from 'koa';
import Router from 'koa-router';
import graphqlHttp from 'koa-graphql';
import cors from 'koa-cors';
import convert from 'koa-convert';
import { print } from 'graphql/language';
import { koaPlayground } from 'graphql-playground-middleware';

import schema from './schema';
import * as loaders from './graphql/loader';
import { getUser, getDataloaders } from './helper';

const app = new Koa();
const router = new Router();

const graphqlSettingsPerReq = async req => {
  const dataloaders = await getDataloaders(loaders);
  const { user } = await getUser(dataloaders, req.header.authorization);

  return {
    graphiql: process.env.NODE_ENV !== 'production',
    schema,
    pretty: true,
    context: {
      user,
      req,
      dataloaders,
    },
    extensions: ({ document, variables, operationName, result }) => {
      console.log(print(document));
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
        stack: error.stack,
      };
    },
  };
};

const graphqlServer = convert(graphqlHttp(graphqlSettingsPerReq));

app.use(cors());

router.all('/graphql', graphqlServer);
router.all(
  '/playground',
  koaPlayground({
    endpoint: '/graphql',
  }),
);

app.use(router.routes()).use(router.allowedMethods());

export default app;
