import { StoryEntity, UserEntity } from 'core-domain';

type PubsubObject<T> = {
  triggeredBy: UserEntity;
  object: T;
};

interface PubsubClient<T, SubscribeArgs = undefined> {
  publish: (object: PubsubObject<T>) => void;
  subscribe(args: SubscribeArgs): AsyncIterableIterator<PubsubObject<T>>;
}

export interface Pubsub {
  story: PubsubClient<StoryEntity, { projectId: string }>;
}
