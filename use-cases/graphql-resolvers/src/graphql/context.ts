import { DefaultContext } from '@envelop/types';
import { UserEntity } from 'core-domain';

export interface GraphqlServerContext extends DefaultContext {
  currentUser?: UserEntity;
}
