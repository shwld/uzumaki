import type {
  ProjectMember_BuiltAttributes,
  ProjectMember_DraftAttributes,
  ProjectMember_RemoveAttributes,
  ProjectMemberEntity,
  ProjectEntity,
} from '../../models';
import { ID, RecordNotFoundError, RuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface ProjectMemberRepository
  extends Omit<
    Repository<ProjectMemberEntity, { project?: ProjectEntity }>,
    'find' | 'findBy'
  > {
  find(args: {
    projectId: ID;
    userId: ID;
  }): Result<RecordNotFoundError | RuntimeError, ProjectMemberEntity>;
  findBy(args: {
    projectId: ID;
    userId: ID;
  }): Result<RuntimeError, ProjectMemberEntity | null>;
  create(
    attributes: ProjectMember_BuiltAttributes
  ): Result<RuntimeError, ProjectMemberEntity>;
  update(
    attributes: ProjectMember_DraftAttributes
  ): Result<RuntimeError, ProjectMemberEntity>;
  destroy(
    attributes: ProjectMember_RemoveAttributes
  ): Result<RuntimeError, ProjectMemberEntity>;
}
