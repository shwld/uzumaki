import type { ProjectMemberInvitationToken } from '@prisma/client';
import type { ProjectMemberInvitationToken_ValidAttributes } from 'core-domain';

export const convertToValidAttributes = (
  record: ProjectMemberInvitationToken
): ProjectMemberInvitationToken_ValidAttributes => {
  return {
    ...record,
    __state: 'Validated',
  };
};
