import type { ProjectMembership, User } from '@prisma/client';
import type { ProjectMember_ValidAttributes } from 'core-domain';

export const convertToValidAttributes = (
  record: ProjectMembership & { user: User }
): ProjectMember_ValidAttributes => {
  return {
    ...record,
    __state: 'Validated',
  };
};
