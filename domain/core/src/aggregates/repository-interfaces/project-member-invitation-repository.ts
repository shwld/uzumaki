import type {
  ProjectMemberInvitation_BuiltAttributes,
  ProjectMemberInvitation_DraftAttributes,
  ProjectMemberInvitation_RemoveAttributes,
  ProjectMemberInvitationEntity,
} from '../../models';
import { RepositoryRuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface ProjectMemberInvitationRepository
  extends Repository<ProjectMemberInvitationEntity, {}> {
  create(
    attributes: ProjectMemberInvitation_BuiltAttributes
  ): Result<RepositoryRuntimeError, ProjectMemberInvitationEntity>;
  update(
    attributes: ProjectMemberInvitation_DraftAttributes
  ): Result<RepositoryRuntimeError, ProjectMemberInvitationEntity>;
  destroy(
    attributes: ProjectMemberInvitation_RemoveAttributes
  ): Result<RepositoryRuntimeError, ProjectMemberInvitationEntity>;
}
