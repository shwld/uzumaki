import type { BaseAttributes, ValidState } from '../../shared/interfaces';
import { ProjectMemberRole } from '../project-member/project-member-interfaces';

export const InvitationTokenState = {
  Inviting: 'INVITING',
  Joined: 'JOINED',
  Expired: 'EXPIRED',
} as const;
export type InvitationTokenState =
  typeof InvitationTokenState[keyof typeof InvitationTokenState];

export interface ProjectMemberInvitationToken_Attributes
  extends BaseAttributes {
  invitationId: string;
  projectId: string;
  role: ProjectMemberRole;
  email: string;
  expiredAt: Date;
}

export interface ProjectMemberInvitationToken_InvitingAttributes
  extends ProjectMemberInvitationToken_Attributes {
  state: typeof InvitationTokenState.Inviting;
}

export interface ProjectMemberInvitationToken_JoinedAttributes
  extends ProjectMemberInvitationToken_Attributes {
  state: typeof InvitationTokenState.Joined;
}

export interface ProjectMemberInvitationToken_ExpiredAttributes
  extends ProjectMemberInvitationToken_Attributes {
  state: typeof InvitationTokenState.Expired;
}

export interface ProjectMemberInvitationToken_ValidAttributes
  extends ProjectMemberInvitationToken_Attributes,
    ValidState {}
