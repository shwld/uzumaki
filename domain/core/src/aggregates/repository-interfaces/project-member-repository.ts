import type {
  ProjectMember_BuiltAttributes,
  ProjectMember_DraftAttributes,
  ProjectMember_RemoveAttributes,
  ProjectMember_ValidAttributes,
} from '../../models';
import { RepositoryRuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface ProjectMemberRepository
  extends Repository<ProjectMember_ValidAttributes, {}> {
  create(
    attributes: ProjectMember_BuiltAttributes
  ): Result<RepositoryRuntimeError, ProjectMember_ValidAttributes>;
  update(
    attributes: ProjectMember_DraftAttributes
  ): Result<RepositoryRuntimeError, ProjectMember_ValidAttributes>;
  destroy(
    attributes: ProjectMember_RemoveAttributes
  ): Result<RepositoryRuntimeError, ProjectMember_ValidAttributes>;
}
