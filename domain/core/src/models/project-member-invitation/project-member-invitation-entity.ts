import { EntityState } from '../../shared';
import type { ProjectMemberInvitation_Attributes } from './project-member-invitation-interfaces';

export type ProjectMemberInvitationEntity = ProjectMemberInvitation_Attributes &
  EntityState & {};

export function ProjectMemberInvitationEntity(
  item: ProjectMemberInvitation_Attributes
): ProjectMemberInvitationEntity {
  return {
    ...item,
    __state: 'Entity',
  };
}
