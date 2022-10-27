import type {
  ProjectEntity,
  ProjectMemberEntity,
  UserEntity,
} from '../../models';
import { Repository } from './base';

export interface ProjectMemberRepository
  extends Omit<
    Repository<ProjectMemberEntity, { project: ProjectEntity }>,
    'findBy'
  > {
  findBy: (args: {
    id: string;
    projectId: string;
  }) => Promise<ProjectMemberEntity | undefined>;
  findByUser: (args: {
    projectId: string;
    user: UserEntity;
  }) => Promise<ProjectMemberEntity | undefined>;
}
