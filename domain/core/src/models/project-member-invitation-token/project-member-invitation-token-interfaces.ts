import type { BaseAttributes, ValidState } from '../../shared/interfaces';

export interface ProjectMemberInvitationToken_Attributes
  extends BaseAttributes {
  invitationId: string;
  expiredAt: Date;
}

export interface ProjectMemberInvitationToken_ValidAttributes
  extends ProjectMemberInvitationToken_Attributes,
    ValidState {}
