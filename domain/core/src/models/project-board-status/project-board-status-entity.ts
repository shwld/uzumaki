import { EntityState } from '../../shared';
import type { ProjectBoardStatus_Attributes } from './project-board-status-interfaces';

export type ProjectBoardStatusEntity = ProjectBoardStatus_Attributes &
  EntityState & {};

export function ProjectBoardStatusEntity(
  item: ProjectBoardStatus_Attributes
): ProjectBoardStatusEntity {
  return {
    ...item,
    __state: 'Entity',
  };
}
