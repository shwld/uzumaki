import type { User_Attributes } from '../user-interfaces';
import { RemovingState, STATE_IS_REMOVING } from '../../../lib/interfaces';

/**
 * Interfaces
 */
export interface User_RemoveAttributes extends User_Attributes, RemovingState {}

/**
 * Mutation
 */
export const remove = (item: User_Attributes): User_RemoveAttributes => {
  return { ...item, __state: STATE_IS_REMOVING };
};
