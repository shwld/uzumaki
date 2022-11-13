import type {
  ProjectMemberInvitation_BuiltAttributes,
  ProjectMemberInvitation_DraftAttributes,
  ProjectMemberInvitation_RemoveAttributes,
  ProjectMemberInvitationEntity,
} from '../../models';
import { RuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface ProjectMemberInvitationRepository
  extends Repository<ProjectMemberInvitationEntity, {}> {
  create(
    attributes: ProjectMemberInvitation_BuiltAttributes
  ): Result<RuntimeError, ProjectMemberInvitationEntity>;
  update(
    attributes: ProjectMemberInvitation_DraftAttributes
  ): Result<RuntimeError, ProjectMemberInvitationEntity>;
  destroy(
    attributes: ProjectMemberInvitation_RemoveAttributes
  ): Result<RuntimeError, ProjectMemberInvitationEntity>;
}
