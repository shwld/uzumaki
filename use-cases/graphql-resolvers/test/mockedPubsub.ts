import type { Pubsub } from '../src/interfaces';

const mockedData: any = undefined;

export const MockedPubsub: Pubsub = {
  story: {
    subscribe() {
      return mockedData;
    },
    publish() {},
  },
};
