// @flow
/* eslint-disable no-console */
import app from './app';
import connectToDatabase from './database';
import { graphqlPort } from './config';

(async () => {
  try {
    const info = await connectToDatabase();
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }

  await app.listen(graphqlPort);
  console.log(`Server started on port ${graphqlPort}`);
})();
