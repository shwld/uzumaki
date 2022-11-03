import type {
  ProjectMember_BuiltAttributes,
  ProjectMember_DraftAttributes,
  ProjectMember_RemoveAttributes,
  ProjectMemberEntity,
} from '../../models';
import { RepositoryRuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface ProjectMemberRepository
  extends Repository<ProjectMemberEntity, {}> {
  create(
    attributes: ProjectMember_BuiltAttributes
  ): Result<RepositoryRuntimeError, ProjectMemberEntity>;
  update(
    attributes: ProjectMember_DraftAttributes
  ): Result<RepositoryRuntimeError, ProjectMemberEntity>;
  destroy(
    attributes: ProjectMember_RemoveAttributes
  ): Result<RepositoryRuntimeError, ProjectMemberEntity>;
}
