import type { ProjectMemberInvitation_Attributes } from '../project-member-invitation-interfaces';
import { RemovingState, STATE_IS_REMOVING } from '../../../lib/interfaces';

/**
 * Interfaces
 */
export interface ProjectMemberInvitation_RemoveAttributes
  extends ProjectMemberInvitation_Attributes,
    RemovingState {}

/**
 * Mutation
 */
export const remove = (
  item: ProjectMemberInvitation_Attributes
): ProjectMemberInvitation_RemoveAttributes => {
  return { ...item, __state: STATE_IS_REMOVING };
};
