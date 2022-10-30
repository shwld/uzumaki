import type {
  ProjectMemberInvitation_BuiltAttributes,
  ProjectMemberInvitation_DraftAttributes,
  ProjectMemberInvitation_RemoveAttributes,
  ProjectMemberInvitation_ValidAttributes,
} from '../../models';
import { RepositoryRuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface ProjectMemberInvitationRepository
  extends Repository<ProjectMemberInvitation_ValidAttributes, {}> {
  create(
    attributes: ProjectMemberInvitation_BuiltAttributes
  ): Result<RepositoryRuntimeError, ProjectMemberInvitation_ValidAttributes>;
  update(
    attributes: ProjectMemberInvitation_DraftAttributes
  ): Result<RepositoryRuntimeError, ProjectMemberInvitation_ValidAttributes>;
  destroy(
    attributes: ProjectMemberInvitation_RemoveAttributes
  ): Result<RepositoryRuntimeError, ProjectMemberInvitation_ValidAttributes>;
}
