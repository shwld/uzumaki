import { InvalidAttributesError } from '../../../shared/error';
import type { ProjectPrivacy, Project_Attributes } from '../project-interfaces';
import { ProjectValidator } from '../project-validator';
import { pipe, Result, map } from '../../../shared/result';
import { BuiltState, ID, STATE_IS_BUILT } from '../../../shared/interfaces';
import { generateId } from '../../../shared/id';
import { genericValidator, validateWith } from '../../../shared/validator';
import { z } from 'zod';
import {
  ProjectBoardConfigValidator,
  ProjectBoardConfig_Attributes,
} from '../../project-board-config';
import {
  ProjectBoardStatusValidator,
  ProjectBoardStatus_Attributes,
} from '../../project-board-status';

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
    BuiltState {
  config: ProjectBoardConfig_Attributes;
  status: ProjectBoardStatus_Attributes;
}

/**
 * Validation
 */
export const validationSchema = z
  .object({
    ...ProjectValidator.validators,
    createdById: genericValidator.id,
    config: ProjectBoardConfigValidator.schema,
    status: ProjectBoardStatusValidator.schema,
  })
  .strict();

/**
 * Mutation
 */
export const build = (
  input: Project_BuildInput
): Result<InvalidAttributesError, Project_BuiltAttributes> => {
  const boardConfigId = generateId();
  const boardStatusId = generateId();
  return pipe(
    {
      ...input,
      boardConfigId,
      boardStatusId,
      config: {
        id: boardConfigId,
        initialVelocity: 10,
        startOn: null,
        startIterationOn: 'MONDAY',
        iterationLength: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      status: {
        id: boardStatusId,
        velocity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
