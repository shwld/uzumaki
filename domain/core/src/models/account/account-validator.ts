import * as E from 'fp-ts/Either';
import { z } from 'zod';
import { InvalidAttributesError } from '../../shared/error';
import { genericValidator } from '../../shared/validator';
import { userValidator } from '../user';
import type {
  Account_BuildInput,
  Account_BuiltAttributes,
  Account_DraftAttributes,
  Account_EditInput,
} from './account-interfaces';

export const accountValidator = {
  id: z.string().uuid(),
  name: z.string().min(1),
};

export const accountValidationSchema = z
  .object({
    __state: genericValidator.__state,
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...accountValidator,
  })
  .strict();

export function validateOnBuild(
  input: Account_BuildInput
): E.Either<InvalidAttributesError, Account_BuiltAttributes> {
  const parsedInput = accountValidationSchema
    .merge(z.object({ createdById: userValidator.id }))
    .transform<Account_BuiltAttributes>(v => ({ ...v, __state: 'Built' }))
    .safeParse(input);

  return !parsedInput.success
    ? E.left(InvalidAttributesError.from(parsedInput.error))
    : E.right(parsedInput.data);
}

export function validateOnEdit(
  input: Account_EditInput
): E.Either<InvalidAttributesError, Account_DraftAttributes> {
  const parsedInput = accountValidationSchema
    .transform<Account_DraftAttributes>(v => ({ ...v, __state: 'Draft' }))
    .safeParse(input);

  return !parsedInput.success
    ? E.left(InvalidAttributesError.from(parsedInput.error))
    : E.right(parsedInput.data);
}
