import { User_Record } from '../user';
import type {
  ProjectMember_Attributes,
  ProjectMember_Record,
} from './project-member-interfaces';

const fromRecord = (
  record: ProjectMember_Record & { user: User_Record }
): ProjectMember_Attributes => {
  const { user, ...attributes } = record;
  return {
    __state: 'Validated',
    ...attributes,
    name: user.name,
    avatarImageUrl: user.avatarImageUrl,
  };
};

export type ProjectMemberEntity = ProjectMember_Attributes & {};

export function ProjectMemberEntity(
  item: ProjectMember_Attributes
): ProjectMemberEntity {
  return {
    ...item,
  };
}

ProjectMemberEntity.fromRecord = fromRecord;
