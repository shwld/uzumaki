import type { AccountEntity, ProjectEntity, UserEntity } from '../../models';
import { Repository } from './base';

export interface ProjectRepository
  extends Omit<
    Repository<ProjectEntity, { account: AccountEntity }>,
    'create'
  > {
  create: (
    item: ProjectEntity,
    account: AccountEntity
  ) => Promise<ProjectEntity>;
  findByUser: (args: {
    id: string;
    user: UserEntity;
  }) => Promise<ProjectEntity | undefined>;
}
