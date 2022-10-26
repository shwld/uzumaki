import { InvalidAttributesError } from '../../../shared/error';
import type {
  AccountMembership_Attributes,
  AccountRole,
} from '../account-membership-interfaces';
import { AccountMembershipValidator } from '../account-membership-validator';
import { pipe, Result, map } from '../../../shared/functional';
import { DraftState, STATE_IS_DRAFT } from '../../../shared/interfaces';

/**
 * Interfaces
 */
export interface AccountMembership_EditInput {
  role?: AccountRole;
}

export interface AccountMembership_DraftAttributes
  extends AccountMembership_Attributes,
    DraftState {}

/**
 * Mutation
 */
export const edit =
  (input: Partial<AccountMembership_EditInput>) =>
  (
    item: AccountMembership_Attributes
  ): Result<InvalidAttributesError, AccountMembership_DraftAttributes> => {
    return pipe(
      {
        ...item,
        ...input,
      },
      AccountMembershipValidator.validate,
      map(v => ({ ...v, __state: STATE_IS_DRAFT }))
    );
  };
