import { EntityState } from '../../shared';
import type { Project_Attributes } from './project-interfaces';

export type ProjectEntity = Project_Attributes & EntityState & {};

export function ProjectEntity(item: Project_Attributes): ProjectEntity {
  return {
    ...item,
    __state: 'Entity',
  };
}
