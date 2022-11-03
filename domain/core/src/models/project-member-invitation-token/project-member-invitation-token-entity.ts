import { EntityState } from '../../shared';
import type { ProjectMemberInvitationToken_Attributes } from './project-member-invitation-token-interfaces';

export type ProjectMemberInvitationTokenEntity =
  ProjectMemberInvitationToken_Attributes & EntityState & {};

export function ProjectMemberInvitationTokenEntity(
  item: ProjectMemberInvitationToken_Attributes
): ProjectMemberInvitationTokenEntity {
  return {
    ...item,
    __state: 'Entity',
  };
}
