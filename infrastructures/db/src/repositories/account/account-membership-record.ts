import { AccountMembership } from '@prisma/client';
import { AccountMembership_ValidAttributes } from 'core-domain';

export const convertToValidAttributes = (
  record: AccountMembership
): AccountMembership_ValidAttributes => {
  return {
    ...record,
    __state: 'Validated',
  };
};
