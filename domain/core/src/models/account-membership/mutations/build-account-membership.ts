import { InvalidAttributesError } from '../../../shared/error';
import type {
  AccountMembership_Attributes,
  AccountRole,
} from '../account-membership-interfaces';
import { AccountMembershipValidator } from '../account-membership-validator';
import { pipe, Result, map } from '../../../shared/result';
import { BuiltState, STATE_IS_BUILT } from '../../../shared/interfaces';

/**
 * Interfaces
 */
export interface AccountMembership_BuildInput {
  userId: string;
  accountId: string;
  role: AccountRole;
}

export interface AccountMembership_BuiltAttributes
  extends AccountMembership_Attributes,
    BuiltState {}

/**
 * Mutation
 */
export const build = (
  input: AccountMembership_BuildInput
): Result<InvalidAttributesError, AccountMembership_BuiltAttributes> => {
  return pipe(
    {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    AccountMembershipValidator.validate,
    map(v => ({ ...v, __state: STATE_IS_BUILT }))
  );
};
