import type {
  ProjectMemberInvitationToken_BuiltAttributes,
  ProjectMemberInvitationToken_ValidAttributes,
} from '../../models';
import { RepositoryRuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface ProjectMemberInvitationTokenRepository
  extends Pick<
    Repository<ProjectMemberInvitationToken_ValidAttributes, {}>,
    'findBy'
  > {
  create(
    attributes: ProjectMemberInvitationToken_BuiltAttributes
  ): Result<
    RepositoryRuntimeError,
    ProjectMemberInvitationToken_ValidAttributes
  >;
}
