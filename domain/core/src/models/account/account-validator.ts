import { z } from 'zod';
import { Result, toResult } from '../..';
import { InvalidAttributesError } from '../../shared/error';
import { genericValidator } from '../../shared/validator';
import type {
  Account_BuildInput,
  Account_BuildValidInput,
  Account_EditInput,
  Account_EditValidInput,
} from './account-interfaces';

export const accountValidator = {
  name: z.string().min(1),
};

export const accountValidationSchema = z
  .object({
    __state: genericValidator.__state,
    id: genericValidator.id,
  })
  .merge(z.object(accountValidator))
  .strict();

export function validateOnBuild(
  input: Account_BuildInput
): Result<InvalidAttributesError, Account_BuildValidInput> {
  const parsedInput = accountValidationSchema
    .merge(z.object({ createdById: genericValidator.id }))
    .transform<Account_BuildValidInput>(v => ({ ...v, __state: 'Built' }))
    .safeParse(input);

  return toResult(
    !parsedInput.success
      ? Result.left(InvalidAttributesError.from(parsedInput.error))
      : Result.right(parsedInput.data)
  );
}

export function validateOnEdit(
  input: Account_EditInput
): Result<InvalidAttributesError, Account_EditValidInput> {
  const parsedInput = accountValidationSchema
    .transform<Account_EditValidInput>(v => ({ ...v, __state: 'Draft' }))
    .safeParse(input);

  return toResult(
    !parsedInput.success
      ? Result.left(InvalidAttributesError.from(parsedInput.error))
      : Result.right(parsedInput.data)
  );
}
