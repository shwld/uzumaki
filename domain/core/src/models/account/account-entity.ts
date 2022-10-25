import type { Account_Attributes, Account_Record } from './account-interfaces';

export type AccountEntity = Account_Attributes & {};

export function AccountEntity(item: Account_Attributes): AccountEntity {
  return {
    ...item,
  };
}
