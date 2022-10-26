import { InvalidAttributesError } from '../../../shared/error';
import type { ProjectPrivacy, Project_Attributes } from '../project-interfaces';
import { ProjectValidator } from '../project-validator';
import { pipe, Result, map } from '../../../shared/functional';
import { BuiltState, ID, STATE_IS_BUILT } from '../../../shared/interfaces';
import { generateId } from '../../../shared/entity';
import { genericValidator, validateWith } from '../../../shared/validator';
import { z } from 'zod';

/**
 * Interfaces
 */
export interface Project_BuildInput {
  id: ID;
  name: string;
  privacy: ProjectPrivacy;
  description: string;
  accountId: ID;
  createdById: ID;
}

export interface Project_BuiltAttributes
  extends Project_Attributes,
    BuiltState {}

/**
 * Validation
 */
export const validationSchema = z
  .object({
    ...ProjectValidator.validators,
    createdById: genericValidator.id,
  })
  .strict();

/**
 * Mutation
 */
export const build = (
  input: Project_BuildInput
): Result<InvalidAttributesError, Project_BuiltAttributes> => {
  return pipe(
    {
      ...input,
      boardConfigId: generateId(),
      boardStatusId: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    validateWith(validationSchema),
    map(v => ({
      ...v,
      __state: STATE_IS_BUILT,
    }))
  );
};
