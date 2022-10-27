import { InvalidAttributesError } from '../../../shared/error';
import type { ProjectBoardStatus_Attributes } from '../project-board-status-interfaces';
import { ProjectBoardStatusValidator } from '../project-board-status-validator';
import { pipe, Result, map } from '../../../shared/functional';
import { BuiltState, ID, STATE_IS_BUILT } from '../../../shared/interfaces';

/**
 * Interfaces
 */
export interface ProjectBoardStatus_BuildInput {
  id: ID;
  velocity: number;
}

export interface ProjectBoardStatus_BuiltAttributes
  extends ProjectBoardStatus_Attributes,
    BuiltState {}

/**
 * Mutation
 */
export const build = (
  input: ProjectBoardStatus_BuildInput
): Result<InvalidAttributesError, ProjectBoardStatus_BuiltAttributes> => {
  return pipe(
    {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ProjectBoardStatusValidator.validate,
    map(v => ({
      ...v,
      __state: STATE_IS_BUILT,
    }))
  );
};
