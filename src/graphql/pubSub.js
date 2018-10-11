import { PubSub } from 'graphql-subscriptions';

export const EVENTS = {
  PRODUCT: {
    ADDED: 'PRODUCT_ADDED',
  },
};

export default new PubSub();
