import type { Project_Attributes } from '../project-interfaces';
import { RemovingState, STATE_IS_REMOVING } from '../../../lib/interfaces';

/**
 * Interfaces
 */
export interface Project_RemoveAttributes
  extends Project_Attributes,
    RemovingState {}

/**
 * Mutation
 */
export const remove = (item: Project_Attributes): Project_RemoveAttributes => {
  return { ...item, __state: STATE_IS_REMOVING };
};
