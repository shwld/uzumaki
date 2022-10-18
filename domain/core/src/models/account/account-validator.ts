import * as E from 'fp-ts/Either';
import { z } from 'zod';
import { InvalidAttributesError } from '../../shared/error';
import { genericValidator, transformToValid } from '../../shared/validator';
import { userValidator } from '../user';
import type {
  Account_InputAttributes,
  Account_ValidAttributes,
} from './account-interfaces';

export const accountValidator = {
  id: z.string().uuid(),
  name: z.string().min(1),
  createdById: userValidator.id.nullable(),
};

export const accountValidationSchema = z
  .object({
    __state: genericValidator.__state,
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...accountValidator,
  })
  .strict()
  .transform<Account_ValidAttributes>(transformToValid);

export function valid(
  input: Account_InputAttributes
): E.Either<InvalidAttributesError, Account_ValidAttributes> {
  const parsedInput = accountValidationSchema.safeParse(input);

  return !parsedInput.success
    ? E.left(InvalidAttributesError.from(parsedInput.error))
    : E.right(parsedInput.data);
}
