import { z } from 'zod';
import { InvalidAttributesError } from '../../shared/error';
import { Result, toResult } from '../../shared/functional';
import { genericValidator } from '../../shared/validator';
import {
  AccountMembership_BuildInput,
  AccountMembership_BuildValidInput,
  AccountMembership_EditInput,
  AccountMembership_EditValidInput,
} from './account-membership-interfaces';

export const accountMembershipValidator = {
  role: z.enum(['OWNER', 'MEMBER', 'VIEWER']),
};

export const accountMembershipValidationSchema = z
  .object({
    __state: genericValidator.__state,
    userId: genericValidator.id,
    accountId: genericValidator.id,
  })
  .merge(z.object(accountMembershipValidator))
  .strict();

export function validateOnBuild(
  input: AccountMembership_BuildInput
): Result<InvalidAttributesError, AccountMembership_BuildValidInput> {
  const parsedInput = accountMembershipValidationSchema
    .transform<AccountMembership_BuildValidInput>(v => ({
      ...v,
      __state: 'Built',
    }))
    .safeParse(input);

  return toResult(
    !parsedInput.success
      ? Result.left(InvalidAttributesError.from(parsedInput.error))
      : Result.right(parsedInput.data)
  );
}

export function validateOnEdit(
  input: AccountMembership_EditInput
): Result<InvalidAttributesError, AccountMembership_EditValidInput> {
  const parsedInput = accountMembershipValidationSchema
    .transform<AccountMembership_EditValidInput>(v => ({
      ...v,
      __state: 'Draft',
    }))
    .safeParse(input);

  return toResult(
    !parsedInput.success
      ? Result.left(InvalidAttributesError.from(parsedInput.error))
      : Result.right(parsedInput.data)
  );
}
