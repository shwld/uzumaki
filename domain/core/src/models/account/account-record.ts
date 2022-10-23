import type {
  Account_Record,
  Account_BuildValidInput,
  Account_EditValidInput,
  Account_RemoveValidInput,
} from './account-interfaces';

const fieldsFromBuildInput = (
  attributes: Account_BuildValidInput
): Omit<Account_Record, 'createdAt' | 'updatedAt'> => {
  return {
    id: attributes.id,
    name: attributes.name,
  };
};

const fieldsFromEditInput = (
  attributes: Account_EditValidInput
): Pick<Account_Record, 'name'> => {
  const { __state, ...record } = attributes;
  return record;
};

const fieldsFromRemoveInput = (
  attributes: Account_RemoveValidInput
): Pick<Account_Record, 'id'> => {
  const { __state, ...record } = attributes;
  return record;
};

export function AccountRecord() {
  return {};
}

AccountRecord.fieldsFromBuildInput = fieldsFromBuildInput;
AccountRecord.fieldsFromEditInput = fieldsFromEditInput;
AccountRecord.fieldsFromRemoveInput = fieldsFromRemoveInput;
