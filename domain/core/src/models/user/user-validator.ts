import { z } from 'zod';
import { InvalidAttributesError } from '../../shared/error';
import { Result, toResult } from '../../shared/functional';
import { genericValidator } from '../../shared/validator';
import {
  User_BuildInput,
  User_BuildValidInput,
  User_EditInput,
  User_EditValidInput,
} from './user-interfaces';

export const userValidator = {
  name: z.string().min(1),
  avatarImageUrl: z.string().url(),
};

export const userBuildValidator = {
  uid: z.string().min(6),
  email: z.string().email(),
};

export const userValidationSchema = z
  .object({
    __state: genericValidator.__state,
    id: genericValidator.id,
  })
  .merge(z.object(userValidator))
  .strict();

export function validateOnBuild(
  input: User_BuildInput
): Result<InvalidAttributesError, User_BuildValidInput> {
  const parsedInput = userValidationSchema
    .merge(z.object(userBuildValidator))
    .transform<User_BuildValidInput>(v => ({ ...v, __state: 'Built' }))
    .safeParse(input);

  return toResult(
    !parsedInput.success
      ? Result.left(InvalidAttributesError.from(parsedInput.error))
      : Result.right(parsedInput.data)
  );
}

export function validateOnEdit(
  input: User_EditInput
): Result<InvalidAttributesError, User_EditValidInput> {
  const parsedInput = userValidationSchema
    .transform<User_EditValidInput>(v => ({ ...v, __state: 'Draft' }))
    .safeParse(input);

  return toResult(
    !parsedInput.success
      ? Result.left(InvalidAttributesError.from(parsedInput.error))
      : Result.right(parsedInput.data)
  );
}
