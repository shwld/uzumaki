import type { ProjectBoardConfig_Attributes } from './project-board-config-interfaces';

export type ProjectBoardConfigEntity = ProjectBoardConfig_Attributes & {};

export function ProjectBoardConfigEntity(
  item: ProjectBoardConfig_Attributes
): ProjectBoardConfigEntity {
  return {
    ...item,
  };
}
