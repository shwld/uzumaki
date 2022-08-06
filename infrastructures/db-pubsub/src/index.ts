import PGPubsub from 'pg-pubsub';
import type { Pubsub } from 'graphql-resolvers';
import asyncify from 'callback-to-async-iterator';

export const createPubsubClient = (): Pubsub => {
  const pubsubInstance = new PGPubsub(process.env.DATABASE_URL);
  const createPubSub = <T>(channelName: string) => ({
    subscribe() {
      return asyncify<T>(async handler => {
        pubsubInstance.addChannel(channelName, handler);
      });
    },
    publish(item: T) {
      pubsubInstance.publish(channelName, item);
    },
  });

  return {
    story: createPubSub('story'),
  };
};
