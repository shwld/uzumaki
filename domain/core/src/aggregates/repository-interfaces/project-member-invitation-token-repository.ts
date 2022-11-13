import type {
  ProjectMemberInvitationToken_BuiltAttributes,
  ProjectMemberInvitationTokenEntity,
} from '../../models';
import { RuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface ProjectMemberInvitationTokenRepository
  extends Pick<
    Repository<ProjectMemberInvitationTokenEntity, {}>,
    'find' | 'findBy'
  > {
  create(
    attributes: ProjectMemberInvitationToken_BuiltAttributes
  ): Result<RuntimeError, ProjectMemberInvitationTokenEntity>;
}
