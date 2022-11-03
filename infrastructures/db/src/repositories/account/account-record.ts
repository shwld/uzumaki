import { Account } from '@prisma/client';
import { AccountEntity } from 'core-domain';

export const convertToEntity = (record: Account): AccountEntity => {
  return AccountEntity({
    ...record,
  });
};
