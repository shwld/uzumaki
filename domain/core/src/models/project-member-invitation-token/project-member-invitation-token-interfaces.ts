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

interface ProjectMemberInvitationToken_BaseInput extends BaseInputState {
  id: ID;
  expiredAt: Date;
}

export interface ProjectMemberInvitationToken_BuildInput
  extends ProjectMemberInvitationToken_BaseInput {}
export interface ProjectMemberInvitationToken_EditInput
  extends ProjectMemberInvitationToken_BaseInput {
  membershipId?: string | null;
}
export interface ProjectMemberInvitationToken_RemoveInput
  extends BaseInputState {
  id: ID;
}

/**
 * ValidatedInput
 */

interface ProjectMemberInvitationToken_BaseValidInput {
  id: ID;
  role: ProjectMemberRole;
}
export interface ProjectMemberInvitationToken_BuildValidInput
  extends ProjectMemberInvitationToken_BaseValidInput,
    BuiltState {
  projectId: ID;
}
export interface ProjectMemberInvitationToken_EditValidInput
  extends ProjectMemberInvitationToken_BaseValidInput,
    DraftState {
  membershipId: string | null;
}
export interface ProjectMemberInvitationToken_RemoveValidInput
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
export interface ProjectMemberInvitationToken_Record {
  id: string;
  invitationId: string;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMemberInvitationToken_Attributes
  extends BaseAttributes,
    ValidState {
  invitationId: string;
  expiredAt: Date;
}
