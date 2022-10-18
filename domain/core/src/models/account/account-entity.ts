import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { InvalidAttributesError } from '../../shared/error';
import type {
  Account_InputAttributes,
  Account_ValidAttributes,
  Account_Record,
  Account_RemovingAttributes,
  Account_DraftAttributes,
  Account_BuiltAttributes,
} from './account-interfaces';
import { valid } from './account-validator';

const recordToValidAttributes = (
  record: Account_Record
): Account_ValidAttributes => {
  return {
    __state: 'Validated',
    ...record,
  };
};

const build = (
  input: Account_InputAttributes
): E.Either<InvalidAttributesError, Account_BuiltAttributes> => {
  return pipe(
    input,
    valid,
    E.map(a => ({ ...a, __state: 'Built' }))
  );
};

const edit =
  (item: Account_ValidAttributes) =>
  (
    input: Account_InputAttributes
  ): E.Either<InvalidAttributesError, Account_DraftAttributes> => {
    const newRecord: Account_InputAttributes = {
      ...item,
      ...input,
      __state: 'Unvalidated',
    };
    return pipe(
      newRecord,
      valid,
      E.map(a => ({ ...a, __state: 'Draft' }))
    );
  };

const remove =
  (item: Account_ValidAttributes) => (): Account_RemovingAttributes => {
    return { ...item, __state: 'Removing' };
  };

export function AccountEntity(item: Account_ValidAttributes) {
  return {
    edit: edit(item),
    remove: remove(item),
  };
}

AccountEntity.build = build;
AccountEntity.fromRecord = recordToValidAttributes;
