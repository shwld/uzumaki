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
  extends Repository<ProjectMemberEntity, { project?: ProjectEntity }> {
  findByUserOrError(args: {
    userId: ID;
    projectId: ID;
  }): Result<RecordNotFoundError | RuntimeError, ProjectMemberEntity>;
  findByUser(args: {
    userId: ID;
    projectId: ID;
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
