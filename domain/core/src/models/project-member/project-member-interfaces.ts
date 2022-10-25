import type {
  BaseAttributes,
  BaseInputState,
  ValidState,
  DraftState,
  RemovingState,
  BuiltState,
  ID,
} from '../../shared/interfaces';

/**
 * UnvalidatedInput
 */

interface ProjectMember_BaseInput extends BaseInputState {
  projectId: ID;
  userId: ID;
  role: ProjectMemberRole;
}

export interface ProjectMember_BuildInput extends ProjectMember_BaseInput {
  createdByInvitationId: ID;
}
export interface ProjectMember_EditInput extends ProjectMember_BaseInput {}
export interface ProjectMember_RemoveInput extends BaseInputState {
  projectId: ID;
  userId: ID;
}

/**
 * ValidatedInput
 */

interface ProjectMember_BaseValidInput {
  id: ID;
  userId: ID;
  projectId: ID;
  role: ProjectMemberRole;
}
export interface ProjectMember_BuildValidInput
  extends ProjectMember_BaseValidInput,
    BuiltState {}
export interface ProjectMember_EditValidInput
  extends ProjectMember_BaseValidInput,
    DraftState {}
export interface ProjectMember_RemoveValidInput extends RemovingState {
  projectId: ID;
  userId: ID;
}

/**
 * ValidAttributes
 */

export const AccountRole = {
  OWNER: 'OWNER',
  MEMBER: 'MEMBER',
  VIEWER: 'VIEWER',
} as const;

// same as Prisma client
export const ProjectMemberRole = {
  OWNER: 'OWNER',
  VIEWER: 'VIEWER',
  MEMBER: 'MEMBER',
} as const;

export type ProjectMemberRole =
  typeof ProjectMemberRole[keyof typeof ProjectMemberRole];
export interface ProjectMember_Record {
  id: ID;
  userId: ID;
  projectId: ID;
  role: ProjectMemberRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMember_Attributes
  extends Omit<BaseAttributes, 'id'>,
    ValidState {
  userId: ID;
  projectId: ID;
  role: ProjectMemberRole;

  name: string;
  avatarImageUrl: string;
}
