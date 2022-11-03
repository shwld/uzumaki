import type { DefaultContext } from '@envelop/types';
import type { UserEntity, Aggregates } from 'core-domain';
import type { Pubsub, Mailer, Background } from 'domain-interfaces';

export interface GraphqlServerContext extends DefaultContext {
  env: {
    origin: string;
  };
  currentUser: UserEntity | null;
  db: Aggregates;
  mailer: Mailer;
  pubsub: Pubsub;
  background: Background;
}
