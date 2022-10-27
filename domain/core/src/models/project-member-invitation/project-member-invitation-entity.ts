import type { ProjectMemberInvitation_Attributes } from './project-member-invitation-interfaces';

export type ProjectMemberInvitationEntity =
  ProjectMemberInvitation_Attributes & {};

export function ProjectMemberInvitationEntity(
  item: ProjectMemberInvitation_Attributes
): ProjectMemberInvitationEntity {
  return {
    ...item,
  };
}
