import { EntityState } from '../../shared';
import type { Account_Attributes } from './account-interfaces';

export type AccountEntity = Account_Attributes & EntityState & {};

export function AccountEntity(item: Account_Attributes): AccountEntity {
  return {
    ...item,
    __state: 'Entity',
  };
}
