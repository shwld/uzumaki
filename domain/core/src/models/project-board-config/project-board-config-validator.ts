import { z } from 'zod';
import { Result, toResult } from '../..';
import { InvalidAttributesError } from '../../shared/error';
import { genericValidator } from '../../shared/validator';
import type {
  ProjectBoardConfig_EditInput,
  ProjectBoardConfig_EditValidInput,
} from './project-board-config-interfaces';

export const projectValidator = {
  initialVelocity: z.number().int().min(0),
  startOn: z.date().nullable(),
  startIterationOn: z.enum([
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ]),
  iterationLength: z.number().int().min(1).max(10),
};

export const projectValidationSchema = z
  .object({
    __state: genericValidator.__state,
    id: genericValidator.id,
  })
  .merge(z.object(projectValidator))
  .strict();

export function validateOnEdit(
  input: ProjectBoardConfig_EditInput
): Result<InvalidAttributesError, ProjectBoardConfig_EditValidInput> {
  const parsedInput = projectValidationSchema
    .transform<ProjectBoardConfig_EditValidInput>(v => ({
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
