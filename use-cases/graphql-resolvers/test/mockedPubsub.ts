import type { Pubsub } from '../src/interfaces';

export const MockedPubsub: Pubsub = {
  story: {
    subscribe() {},
    publish() {},
  },
};
