import type { UserEntity } from '../../models';
import { Repository } from './base';

export interface UserRepository
  extends Omit<Repository<UserEntity>, 'findMany'> {
  findByUid: (args: { uid: string }) => Promise<UserEntity | undefined>;
  findByEmail: (args: { email: string }) => Promise<UserEntity | undefined>;
}
