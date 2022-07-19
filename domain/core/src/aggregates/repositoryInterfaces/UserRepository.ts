import { ProjectEntity } from '../../models';
import type { UserEntity } from '../../models/user/UserEntity';
import { Repository } from './base';

export interface UserRepository
  extends Omit<Repository<UserEntity>, 'findMany'> {
  projectMembers: (args: { project: ProjectEntity }) => Promise<UserEntity[]>;
  findProjectMemberBy: (args: {
    id: string;
    project: ProjectEntity;
  }) => Promise<UserEntity | undefined>;
}
