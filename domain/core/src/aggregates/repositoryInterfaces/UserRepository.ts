import type { UserEntity } from '../../models/user/UserEntity';
import { Repository } from './base';

export interface UserRepository
  extends Omit<Repository<UserEntity>, 'findMany'> {
  findByUid: (args: { uid: string }) => Promise<UserEntity | undefined>;
}
