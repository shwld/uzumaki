import type { UserEntity } from '../../models/user/entity';
import { Repository } from './base';

export interface UserRepository
  extends Omit<Repository<UserEntity, undefined>, 'findMany'> {}
