import { InvalidAttributesError } from '../../../shared/error';
import type {
  DayOfWeek,
  ProjectBoardConfig_Attributes,
} from '../project-board-config-interfaces';
import { ProjectBoardConfigValidator } from '../project-board-config-validator';
import { pipe, Result, map } from '../../../shared/functional';
import { DraftState, ID, STATE_IS_DRAFT } from '../../../shared/interfaces';

/**
 * Interfaces
 */
export interface ProjectBoardConfig_EditInput {
  initialVelocity?: number;
  startOn?: Date | null;
  startIterationOn?: DayOfWeek;
  iterationLength?: number;
}

export interface ProjectBoardConfig_DraftAttributes
  extends ProjectBoardConfig_Attributes,
    DraftState {}

/**
 * Mutation
 */
export const edit =
  (input: ProjectBoardConfig_EditInput) =>
  (
    item: ProjectBoardConfig_Attributes
  ): Result<InvalidAttributesError, ProjectBoardConfig_DraftAttributes> => {
    const newRecord: ProjectBoardConfig_Attributes = {
      ...item,
      ...input,
    };
    return pipe(
      newRecord,
      ProjectBoardConfigValidator.validate,
      map(v => ({ ...v, __state: STATE_IS_DRAFT }))
    );
  };
