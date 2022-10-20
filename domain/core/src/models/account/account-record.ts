import type {
  Account_Record,
  Account_BuiltAttributes,
  Account_DraftAttributes,
  Account_RemovingAttributes,
} from './account-interfaces';

const attributesToRecord = (
  attributes:
    | Account_BuiltAttributes
    | Account_DraftAttributes
    | Account_RemovingAttributes
): Account_Record => {
  const { __state, ...record } = attributes;
  return record;
};

export function AccountRecord(item: Account_Record) {
  return {};
}

AccountRecord.fromAttributes = attributesToRecord;
