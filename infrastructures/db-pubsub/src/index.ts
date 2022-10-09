import PGPubsub from 'pg-pubsub';
import type { Pubsub } from 'domain-interfaces';
import asyncify from 'callback-to-async-iterator';

const storyChannelName = (projectId: string) => `project-${projectId}-stories`;

export const createPubsubClient = (): Pubsub => {
  const pubsubInstance = new PGPubsub(process.env.DATABASE_URL);

  return {
    story: {
      subscribe({ projectId }) {
        return asyncify(async handler => {
          pubsubInstance.addChannel(storyChannelName(projectId), handler);
        });
      },
      publish(item) {
        pubsubInstance.publish(storyChannelName(item.object.projectId), item);
      },
    },
  };
};
