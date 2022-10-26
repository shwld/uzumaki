import type { Account_Attributes } from './account-interfaces';

export type AccountEntity = Account_Attributes & {};

export function AccountEntity(item: Account_Attributes): AccountEntity {
  return {
    ...item,
  };
}
