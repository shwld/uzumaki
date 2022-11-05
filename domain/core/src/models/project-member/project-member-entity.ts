import { EntityState } from '../../shared';
import type { ProjectMember_Attributes } from './project-member-interfaces';

export type ProjectMemberEntity = ProjectMember_Attributes &
  EntityState & {
    canEditProject(): boolean;
  };

export function ProjectMemberEntity(
  item: ProjectMember_Attributes
): ProjectMemberEntity {
  return {
    ...item,
    canEditProject() {
      return item.role === 'OWNER';
    },
    __state: 'Entity',
  };
}
