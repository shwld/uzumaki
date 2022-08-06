import { StoryEntity } from 'core-domain';

interface PubsubClient<T> {
  publish: (item: T) => void;
  subscribe(): AsyncIterableIterator<T>;
}

export interface Pubsub {
  story: PubsubClient<StoryEntity>;
}
