import * as E from 'fp-ts/Either';
import { z } from 'zod';
import { InvalidAttributesError } from '../../shared/error';
import { genericValidator } from '../../shared/validator';
import { userValidator } from '../user';
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
    id: z.string().uuid(),
  })
  .merge(z.object(accountValidator))
  .strict();

export function validateOnBuild(
  input: Account_BuildInput
): E.Either<InvalidAttributesError, Account_BuildValidInput> {
  const parsedInput = accountValidationSchema
    .merge(z.object({ createdById: userValidator.id }))
    .transform<Account_BuildValidInput>(v => ({ ...v, __state: 'Built' }))
    .safeParse(input);

  return !parsedInput.success
    ? E.left(InvalidAttributesError.from(parsedInput.error))
    : E.right(parsedInput.data);
}

export function validateOnEdit(
  input: Account_EditInput
): E.Either<InvalidAttributesError, Account_EditValidInput> {
  const parsedInput = accountValidationSchema
    .transform<Account_EditValidInput>(v => ({ ...v, __state: 'Draft' }))
    .safeParse(input);

  return !parsedInput.success
    ? E.left(InvalidAttributesError.from(parsedInput.error))
    : E.right(parsedInput.data);
}
