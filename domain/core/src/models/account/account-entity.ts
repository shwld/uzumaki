import type { Account_Attributes, Account_Record } from './account-interfaces';

const fromRecord = (record: Account_Record): Account_Attributes => {
  return {
    __state: 'Validated',
    ...record,
  };
};

export type AccountEntity = Account_Attributes & {};

export function AccountEntity(item: Account_Attributes): AccountEntity {
  return {
    ...item,
  };
}

AccountEntity.fromRecord = fromRecord;
