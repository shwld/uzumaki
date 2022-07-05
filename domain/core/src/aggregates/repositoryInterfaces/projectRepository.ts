import type { AccountEntity, ProjectEntity } from '../../models';
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
}
