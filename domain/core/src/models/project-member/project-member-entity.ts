import { EntityState } from '../../shared';
import type { ProjectMember_Attributes } from './project-member-interfaces';

export type ProjectMemberEntity = ProjectMember_Attributes & EntityState & {};

export function ProjectMemberEntity(
  item: ProjectMember_Attributes
): ProjectMemberEntity {
  return {
    ...item,
    __state: 'Entity',
  };
}
