import { Account } from '@prisma/client';
import { Account_ValidAttributes } from 'core-domain';

export const convertToValidAttributes = (
  record: Account
): Account_ValidAttributes => {
  return {
    ...record,
    __state: 'Validated',
  };
};
