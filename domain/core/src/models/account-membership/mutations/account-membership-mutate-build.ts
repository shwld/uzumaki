import { InvalidAttributesError } from '../../../shared/error';
import type {
  AccountMembership_Attributes,
  AccountMembership_BuildInput,
  AccountMembership_BuildValidInput,
  AccountMembership_EditInput,
  AccountMembership_EditValidInput,
  AccountMembership_RemoveValidInput,
} from '../account-membership-interfaces';
import {
  validateOnBuild,
  validateOnEdit,
} from '../account-membership-validator';
import { pipe, Result } from '../../../shared/functional';

const build = (
  input: AccountMembership_BuildInput
): Result<InvalidAttributesError, AccountMembership_BuildValidInput> => {
  return pipe(input, validateOnBuild);
};
