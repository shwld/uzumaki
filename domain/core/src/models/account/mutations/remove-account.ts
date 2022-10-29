import type { Account_Attributes } from '../account-interfaces';
import { RemovingState, STATE_IS_REMOVING } from '../../../lib/interfaces';

/**
 * Interfaces
 */
export interface Account_RemoveAttributes
  extends Account_Attributes,
    RemovingState {}

/**
 * Mutation
 */
export const remove = (item: Account_Attributes): Account_RemoveAttributes => {
  return { ...item, __state: STATE_IS_REMOVING };
};
