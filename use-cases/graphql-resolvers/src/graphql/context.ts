import { DefaultContext } from '@envelop/types';
import { UserEntity, Aggregates } from 'core-domain';

export interface GraphqlServerContext extends DefaultContext {
  currentUser?: UserEntity;
  db: Aggregates;
}
