import type { Pubsub } from 'domain-interfaces';

const mockedData: any = undefined;

export const MockedPubsub: Pubsub = {
  story: {
    subscribe() {
      return mockedData;
    },
    publish() {},
  },
};
