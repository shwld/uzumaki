import { Aggregates } from 'core-domain';
import { create } from './project-member-invitation-token-create';
import { findBy } from './project-member-invitation-token-find-by';

export const ProjectMemberInvitationTokenRepository: Aggregates['projectMemberInvitationToken'] =
  {
    create,
    findBy,
  };
