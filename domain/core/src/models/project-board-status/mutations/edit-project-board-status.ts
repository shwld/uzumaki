import { InvalidAttributesError } from '../../../lib/error';
import type { ProjectBoardStatus_Attributes } from '../project-board-status-interfaces';
import { ProjectBoardStatusValidator } from '../project-board-status-validator';
import { pipe, Result, map } from '../../../lib/result';
import { DraftState, STATE_IS_DRAFT } from '../../../lib/interfaces';

/**
 * Interfaces
 */
export interface ProjectBoardStatus_EditInput {
  velocity?: number;
}

export interface ProjectBoardStatus_DraftAttributes
  extends ProjectBoardStatus_Attributes,
    DraftState {}

/**
 * Mutation
 */
export const edit =
  (input: ProjectBoardStatus_EditInput) =>
  (
    item: ProjectBoardStatus_Attributes
  ): Result<InvalidAttributesError, ProjectBoardStatus_DraftAttributes> => {
    const newRecord: ProjectBoardStatus_Attributes = {
      ...item,
      ...input,
    };
    return pipe(
      newRecord,
      ProjectBoardStatusValidator.validate,
      map(v => ({ ...v, __state: STATE_IS_DRAFT }))
    );
  };
