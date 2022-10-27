import type { ProjectMemberInvitationToken_Attributes } from './project-member-invitation-token-interfaces';

export type ProjectMemberInvitationTokenEntity =
  ProjectMemberInvitationToken_Attributes & {};

export function ProjectMemberInvitationTokenEntity(
  item: ProjectMemberInvitationToken_Attributes
): ProjectMemberInvitationTokenEntity {
  return {
    ...item,
  };
}
