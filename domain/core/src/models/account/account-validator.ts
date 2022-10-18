import * as E from 'fp-ts/Either';
import { z } from 'zod';
import { InvalidAttributesError } from '../../shared/error';
import { genericValidator, transformToValid } from '../../shared/validator';
import { userValidator } from '../user';
import type {
  Account_Attributes,
  Account_ValidAttributes,
} from './account-interfaces';

export const accountValidator = {
  id: z.string().uuid(),
  name: z.string().min(1),
  createdById: userValidator.id.nullable(),
};

export const accountValidationSchema = z
  .object({
    attributesType: genericValidator.attributesType,
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...accountValidator,
  })
  .strict()
  .transform<Account_ValidAttributes>(transformToValid);

export function valid(
  input: Account_Attributes
): E.Either<InvalidAttributesError, Account_ValidAttributes> {
  const parsedInput = accountValidationSchema.safeParse(input);

  return !parsedInput.success
    ? E.left(InvalidAttributesError.from(parsedInput.error))
    : E.right(parsedInput.data);
}
