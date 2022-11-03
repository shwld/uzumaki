import type {
  ProjectMemberInvitationToken_BuiltAttributes,
  ProjectMemberInvitationTokenEntity,
} from '../../models';
import { RepositoryRuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface ProjectMemberInvitationTokenRepository
  extends Pick<Repository<ProjectMemberInvitationTokenEntity, {}>, 'findBy'> {
  create(
    attributes: ProjectMemberInvitationToken_BuiltAttributes
  ): Result<RepositoryRuntimeError, ProjectMemberInvitationTokenEntity>;
}
