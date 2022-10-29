import type { BaseAttributes, ValidState } from '../../lib/interfaces';

export interface ProjectMemberInvitationToken_Attributes
  extends BaseAttributes {
  invitationId: string;
  expiredAt: Date;
}

export interface ProjectInvitation_ValidAttributes
  extends ProjectMemberInvitationToken_Attributes,
    ValidState {}
