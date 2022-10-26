import type { AccountMembership_Attributes } from './account-membership-interfaces';

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
