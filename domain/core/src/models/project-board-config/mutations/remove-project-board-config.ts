import type { ProjectBoardConfig_Attributes } from '../project-board-config-interfaces';
import { RemovingState, STATE_IS_REMOVING } from '../../../shared/interfaces';

/**
 * Interfaces
 */
export interface ProjectBoardConfig_RemoveAttributes
  extends ProjectBoardConfig_Attributes,
    RemovingState {}

/**
 * Mutation
 */
export const remove = (
  item: ProjectBoardConfig_Attributes
): ProjectBoardConfig_RemoveAttributes => {
  return { ...item, __state: STATE_IS_REMOVING };
};
