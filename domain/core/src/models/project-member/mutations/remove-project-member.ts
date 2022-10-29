import type { ProjectMember_Attributes } from '../project-member-interfaces';
import { RemovingState, STATE_IS_REMOVING } from '../../../lib/interfaces';

/**
 * Interfaces
 */
export interface ProjectMember_RemoveAttributes
  extends ProjectMember_Attributes,
    RemovingState {}

/**
 * Mutation
 */
export const remove = (
  item: ProjectMember_Attributes
): ProjectMember_RemoveAttributes => {
  return { ...item, __state: STATE_IS_REMOVING };
};
