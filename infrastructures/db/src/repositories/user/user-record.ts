import type { User } from '@prisma/client';
import type { User_ValidAttributes } from 'core-domain';

export const convertToValidAttributes = (
  record: User
): User_ValidAttributes => {
  return {
    ...record,
    __state: 'Validated',
  };
};
