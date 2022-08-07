import type { DefaultContext } from '@envelop/types';
import type { UserEntity, Aggregates } from 'core-domain';
import type { Pubsub, Mailer, Background } from './interfaces';

export interface GraphqlServerContext extends DefaultContext {
  currentUser?: UserEntity;
  db: Aggregates;
  mailer: Mailer;
  pubsub: Pubsub;
  background: Background;
}
