import type { Project_Attributes } from './project-interfaces';

export type ProjectEntity = Project_Attributes & {};

export function ProjectEntity(item: Project_Attributes): ProjectEntity {
  return {
    ...item,
  };
}
