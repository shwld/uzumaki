import type { BaseAttributes, ValidState } from '../../shared/interfaces';
import { ProjectMemberRole } from '../project-member';

export interface ProjectMemberInvitation_Attributes extends BaseAttributes {
  membershipId: string | null;
  projectId: string;
  role: ProjectMemberRole;
  email: string;
}

export interface ProjectInvitation_ValidAttributes
  extends ProjectMemberInvitation_Attributes,
    ValidState {}
