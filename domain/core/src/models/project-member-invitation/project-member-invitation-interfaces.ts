import type {
  BaseAttributes,
  BaseInputState,
  ValidState,
  DraftState,
  RemovingState,
  BuiltState,
  ID,
} from '../../shared/interfaces';
import { ProjectMemberRole } from '../project-member';

/**
 * UnvalidatedInput
 */

interface ProjectMemberInvitation_BaseInput extends BaseInputState {
  id: ID;
  role: ProjectMemberRole;
}

export interface ProjectMemberInvitation_BuildInput
  extends ProjectMemberInvitation_BaseInput {
  projectId: ID;
  email: string;
}
export interface ProjectMemberInvitation_EditInput
  extends ProjectMemberInvitation_BaseInput {
  membershipId?: string | null;
}
export interface ProjectMemberInvitation_RemoveInput extends BaseInputState {
  id: ID;
}

/**
 * ValidatedInput
 */

interface ProjectMemberInvitation_BaseValidInput {
  id: ID;
  role: ProjectMemberRole;
}
export interface ProjectMemberInvitation_BuildValidInput
  extends ProjectMemberInvitation_BaseValidInput,
    BuiltState {
  projectId: ID;
}
export interface ProjectMemberInvitation_EditValidInput
  extends ProjectMemberInvitation_BaseValidInput,
    DraftState {
  membershipId: string | null;
}
export interface ProjectMemberInvitation_RemoveValidInput
  extends RemovingState {
  id: ID;
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
export interface ProjectMemberInvitation_Record {
  id: string;
  membershipId: string | null;
  projectId: string;
  role: ProjectMemberRole;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMemberInvitation_Attributes
  extends BaseAttributes,
    ValidState {
  membershipId: string | null;
  projectId: string;
  role: ProjectMemberRole;
  email: string;
}
