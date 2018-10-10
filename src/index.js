// @flow
/* eslint-disable no-console */
import { createServer } from 'http';

import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import app from './app';
import connectToDatabase from './database';
import { graphqlPort } from './config';
import schema from './schema';

(async () => {
  try {
    const info = await connectToDatabase();
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }

  const server = createServer(app.callback());

  await server.listen(graphqlPort, () => {
    SubscriptionServer.create(
      {
        onConnect: connectionParams => console.log('client subscription connected!', connectionParams),
        onDisconnect: () => console.log('client subscription disconnected!'),
        execute,
        subscribe,
        schema,
      },
      {
        server,
        path: '/subscriptions',
      },
    );
  });
  console.log(`Server started on port ${graphqlPort}`);
})();
