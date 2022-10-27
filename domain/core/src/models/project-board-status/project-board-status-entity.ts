import type { ProjectBoardStatus_Attributes } from './project-board-status-interfaces';

export type ProjectBoardStatusEntity = ProjectBoardStatus_Attributes & {};

export function ProjectBoardStatusEntity(
  item: ProjectBoardStatus_Attributes
): ProjectBoardStatusEntity {
  return {
    ...item,
  };
}
