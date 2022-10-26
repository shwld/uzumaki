import { InvalidAttributesError } from '../../../shared/error';
import type {
  DayOfWeek,
  ProjectBoardConfig_Attributes,
} from '../project-board-config-interfaces';
import { ProjectBoardConfigValidator } from '../project-board-config-validator';
import { pipe, Result, map } from '../../../shared/functional';
import { BuiltState, ID, STATE_IS_BUILT } from '../../../shared/interfaces';
import { generateId } from '../../../shared/entity';
import { genericValidator, validateWith } from '../../../shared/validator';
import { z } from 'zod';
import { ProjectPrivacy } from '../../project/project-interfaces';

/**
 * Interfaces
 */
export interface ProjectBoardConfig_BuildInput {
  id: ID;
  initialVelocity: number;
  startOn: Date | null;
  startIterationOn: DayOfWeek;
  iterationLength: number;
}

export interface ProjectBoardConfig_BuiltAttributes
  extends ProjectBoardConfig_Attributes,
    BuiltState {}

/**
 * Mutation
 */
export const build = (
  input: ProjectBoardConfig_BuildInput
): Result<InvalidAttributesError, ProjectBoardConfig_BuiltAttributes> => {
  return pipe(
    {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ProjectBoardConfigValidator.validate,
    map(v => ({
      ...v,
      __state: STATE_IS_BUILT,
    }))
  );
};
