import type { ProjectEntity, ProjectUserEntity } from '../../models';
import { Repository } from './base';

export interface ProjectUserRepository
  extends Omit<
    Repository<ProjectUserEntity, { project: ProjectEntity }>,
    'findBy'
  > {
  findBy: (args: {
    projectId: string;
    userId: string;
  }) => Promise<ProjectUserEntity | undefined>;
}
