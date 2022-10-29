import type { BaseAttributes, ValidState, ID } from '../../lib/interfaces';
import { User_Attributes } from '../user';

export const ProjectMemberRole = {
  OWNER: 'OWNER',
  VIEWER: 'VIEWER',
  MEMBER: 'MEMBER',
} as const;
export type ProjectMemberRole =
  typeof ProjectMemberRole[keyof typeof ProjectMemberRole];

export type ProjectMemberUser_Attributes = Pick<
  User_Attributes,
  'id' | 'name' | 'avatarImageUrl'
>;
export interface ProjectMember_Attributes extends BaseAttributes {
  projectId: ID;
  userId: ID;
  role: ProjectMemberRole;
  user: ProjectMemberUser_Attributes;
}

export interface ProjectMember_ValidAttributes
  extends ProjectMember_Attributes,
    ValidState {}
