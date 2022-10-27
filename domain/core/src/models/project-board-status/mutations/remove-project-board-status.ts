import type { ProjectBoardStatus_Attributes } from '../project-board-status-interfaces';
import { RemovingState, STATE_IS_REMOVING } from '../../../shared/interfaces';

/**
 * Interfaces
 */
export interface ProjectBoardStatus_RemoveAttributes
  extends ProjectBoardStatus_Attributes,
    RemovingState {}

/**
 * Mutation
 */
export const remove = (
  item: ProjectBoardStatus_Attributes
): ProjectBoardStatus_RemoveAttributes => {
  return { ...item, __state: STATE_IS_REMOVING };
};
