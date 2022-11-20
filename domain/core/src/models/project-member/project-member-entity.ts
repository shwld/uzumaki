import { EntityState } from '../../shared';
import { UserProfileEntity } from '../user-profile';
import type { ProjectMember_Attributes } from './project-member-interfaces';

export type ProjectMemberEntity = Omit<ProjectMember_Attributes, 'user'> &
  EntityState & {
    profile: UserProfileEntity;
    canEditProject(): boolean;
  };

export function ProjectMemberEntity(
  item: ProjectMember_Attributes
): ProjectMemberEntity {
  const { user, ...columns } = item;
  return {
    ...columns,
    profile: UserProfileEntity(item.user),
    canEditProject() {
      return item.role === 'OWNER';
    },
    __state: 'Entity',
  };
}
