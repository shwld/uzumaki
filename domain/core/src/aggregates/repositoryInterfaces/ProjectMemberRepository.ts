import type { ProjectEntity, ProjectMemberEntity } from '../../models';
import { Repository } from './base';

export interface ProjectMemberRepository
  extends Omit<
    Repository<ProjectMemberEntity, { project: ProjectEntity }>,
    'findBy'
  > {
  findBy: (args: {
    projectId: string;
    userId: string;
  }) => Promise<ProjectMemberEntity | undefined>;
}
