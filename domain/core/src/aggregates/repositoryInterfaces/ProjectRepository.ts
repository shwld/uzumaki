import type {
  AccountEntity,
  ProjectEntity,
  ProjectUserEntity,
  UserEntity,
} from '../../models';
import { NodesWrapper, PaginationArguments, Repository } from './base';

export interface ProjectRepository
  extends Repository<ProjectEntity, { account: AccountEntity }> {
  findByUser: (args: {
    id: string;
    user: UserEntity;
  }) => Promise<ProjectEntity | undefined>;
  memberFindMany: (
    args: {
      project: ProjectEntity;
    } & PaginationArguments
  ) => Promise<NodesWrapper<ProjectUserEntity>>;
  memberFindBy: (args: {
    projectId: string;
    userId: string;
  }) => Promise<ProjectUserEntity | undefined>;
}
