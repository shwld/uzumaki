import type { ProjectMemberInvitation } from '@prisma/client';
import { ProjectMemberInvitationEntity } from 'core-domain';

export const convertToEntity = (
  record: ProjectMemberInvitation
): ProjectMemberInvitationEntity => {
  return ProjectMemberInvitationEntity(record);
};
