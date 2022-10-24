import { InvalidAttributesError } from '../../shared/error';
import type {
  AccountMembership_Attributes,
  AccountMembership_BuildInput,
  AccountMembership_BuildValidInput,
  AccountMembership_EditInput,
  AccountMembership_EditValidInput,
  AccountMembership_RemoveValidInput,
} from './account-membership-interfaces';
import {
  validateOnBuild,
  validateOnEdit,
} from './account-membership-validator';
import { pipe, Result } from '../../shared/functional';

const build = (
  input: AccountMembership_BuildInput
): Result<InvalidAttributesError, AccountMembership_BuildValidInput> => {
  return pipe(input, validateOnBuild);
};

const edit =
  (input: Partial<AccountMembership_EditInput>) =>
  (
    item: AccountMembership_Attributes
  ): Result<InvalidAttributesError, AccountMembership_EditValidInput> => {
    const newRecord: AccountMembership_EditInput = {
      userId: item.userId,
      accountId: item.accountId,
      role: item.role,
      ...input,
      __state: 'Unvalidated',
    };
    return pipe(newRecord, validateOnEdit);
  };

const remove = (
  item: AccountMembership_Attributes
): AccountMembership_RemoveValidInput => {
  return { ...item, __state: 'Removing' };
};

export const AccountMembershipMutations = {
  build,
  edit,
  remove,
};
