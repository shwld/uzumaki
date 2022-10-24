import { z } from 'zod';
import { Result, toResult } from '../..';
import { InvalidAttributesError } from '../../shared/error';
import { genericValidator } from '../../shared/validator';
import type {
  Project_BuildInput,
  Project_BuildValidInput,
  Project_EditInput,
  Project_EditValidInput,
} from './project-interfaces';

export const projectValidator = {
  name: z.string().min(1),
  description: z.string(),
  privacy: z.enum(['PRIVATE', 'PUBLIC']),
};

export const projectValidationSchema = z
  .object({
    __state: genericValidator.__state,
    id: genericValidator.id,
  })
  .merge(z.object(projectValidator))
  .strict();

export function validateOnBuild(
  input: Project_BuildInput
): Result<InvalidAttributesError, Project_BuildValidInput> {
  const parsedInput = projectValidationSchema
    .merge(
      z.object({
        createdById: genericValidator.id,
        accountId: genericValidator.id,
      })
    )
    .transform<Project_BuildValidInput>(v => ({ ...v, __state: 'Built' }))
    .safeParse(input);

  return toResult(
    !parsedInput.success
      ? Result.left(InvalidAttributesError.from(parsedInput.error))
      : Result.right(parsedInput.data)
  );
}

export function validateOnEdit(
  input: Project_EditInput
): Result<InvalidAttributesError, Project_EditValidInput> {
  const parsedInput = projectValidationSchema
    .transform<Project_EditValidInput>(v => ({ ...v, __state: 'Draft' }))
    .safeParse(input);

  return toResult(
    !parsedInput.success
      ? Result.left(InvalidAttributesError.from(parsedInput.error))
      : Result.right(parsedInput.data)
  );
}
