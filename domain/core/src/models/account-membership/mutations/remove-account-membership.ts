import type { AccountMembership_Attributes } from '../account-membership-interfaces';
import { RemovingState, STATE_IS_REMOVING } from '../../../shared/interfaces';

/**
 * Interfaces
 */

export interface AccountMembership_RemoveAttributes
  extends AccountMembership_Attributes,
    RemovingState {}

/**
 * Mutation
 */
export const remove = (
  item: AccountMembership_Attributes
): AccountMembership_RemoveAttributes => {
  return {
    ...item,
    __state: STATE_IS_REMOVING,
  };
};
