import type { ProjectMemberInvitationToken } from '@prisma/client';
import { ProjectMemberInvitationTokenEntity } from 'core-domain';

export const convertToEntity = (
  record: ProjectMemberInvitationToken
): ProjectMemberInvitationTokenEntity => {
  return ProjectMemberInvitationTokenEntity(record);
};
