import type {
  AccountMembership_Record,
  AccountMembership_BuildValidInput,
  AccountMembership_EditValidInput,
  AccountMembership_RemoveValidInput,
} from './account-membership-interfaces';

const fieldsFromBuildInput = (
  attributes: AccountMembership_BuildValidInput
): Omit<AccountMembership_Record, 'createdAt' | 'updatedAt'> => {
  return {
    userId: attributes.userId,
    accountId: attributes.accountId,
    role: attributes.role,
  };
};

const fieldsFromEditInput = (
  attributes: AccountMembership_EditValidInput
): Pick<AccountMembership_Record, 'role'> => {
  const { __state, ...record } = attributes;
  return record;
};

const fieldsFromRemoveInput = (
  attributes: AccountMembership_RemoveValidInput
): Pick<AccountMembership_Record, 'userId' | 'accountId'> => {
  const { __state, ...record } = attributes;
  return record;
};

export function AccountMembershipRecord() {
  return {};
}

AccountMembershipRecord.fieldsFromBuildInput = fieldsFromBuildInput;
AccountMembershipRecord.fieldsFromEditInput = fieldsFromEditInput;
AccountMembershipRecord.fieldsFromRemoveInput = fieldsFromRemoveInput;
