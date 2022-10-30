import type { ProjectMemberInvitation } from '@prisma/client';
import type { ProjectMemberInvitation_ValidAttributes } from 'core-domain';

export const convertToValidAttributes = (
  record: ProjectMemberInvitation
): ProjectMemberInvitation_ValidAttributes => {
  return {
    ...record,
    __state: 'Validated',
  };
};
