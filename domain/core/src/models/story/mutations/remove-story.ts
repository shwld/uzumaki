import type { Story_Attributes } from '../story-interfaces';
import { RemovingState, STATE_IS_REMOVING } from '../../../shared/interfaces';

/**
 * Interfaces
 */
export interface Story_RemoveAttributes
  extends Story_Attributes,
    RemovingState {}

/**
 * Mutation
 */
export const remove = (item: Story_Attributes): Story_RemoveAttributes => {
  return { ...item, __state: STATE_IS_REMOVING };
};
