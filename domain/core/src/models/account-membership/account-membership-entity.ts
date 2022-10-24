import type {
  AccountMembership_Attributes,
  AccountMembership_Record,
} from './account-membership-interfaces';

const fromRecord = (
  record: AccountMembership_Record
): AccountMembership_Attributes => {
  return {
    __state: 'Validated',
    ...record,
  };
};

export type AccountMembershipEntity = AccountMembership_Attributes & {
  canAccountEdit(): boolean;
};

export function AccountMembershipEntity(
  item: AccountMembership_Attributes
): AccountMembershipEntity {
  return {
    ...item,
    canAccountEdit() {
      return item.role === 'OWNER';
    },
  };
}

AccountMembershipEntity.fromRecord = fromRecord;
