import { z } from 'zod';
import { Result, toResult } from '../..';
import { InvalidAttributesError } from '../../shared/error';
import { genericValidator } from '../../shared/validator';
import type {
  ProjectBoardStatus_EditInput,
  ProjectBoardStatus_EditValidInput,
} from './project-board-status-interfaces';

export const projectValidator = {
  velocity: z.number().int().min(0),
};

export const projectValidationSchema = z
  .object({
    __state: genericValidator.__state,
    id: genericValidator.id,
  })
  .merge(z.object(projectValidator))
  .strict();

export function validateOnEdit(
  input: ProjectBoardStatus_EditInput
): Result<InvalidAttributesError, ProjectBoardStatus_EditValidInput> {
  const parsedInput = projectValidationSchema
    .transform<ProjectBoardStatus_EditValidInput>(v => ({
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
