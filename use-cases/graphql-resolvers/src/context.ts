import type { DefaultContext } from '@envelop/types';
import { UserEntity, Aggregates } from 'core-domain';
import { Mailer } from './interfaces/mailer';

export interface GraphqlServerContext extends DefaultContext {
  currentUser?: UserEntity;
  db: Aggregates;
  mailer: Mailer;
}
