import { ProjectEntity } from '../../models';
import type { UserEntity } from '../../models/user/UserEntity';
import { Repository } from './base';

export interface UserRepository
  extends Omit<Repository<UserEntity, undefined>, 'findMany'> {
  projectMembers: (args: { project: ProjectEntity }) => Promise<UserEntity[]>;
}
