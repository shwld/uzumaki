import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { InvalidAttributesError } from '../../shared/error';
import type {
  Account_BuildInput,
  Account_EditInput,
  Account_ValidAttributes,
  Account_Record,
  Account_RemovingAttributes,
  Account_DraftAttributes,
  Account_BuiltAttributes,
} from './account-interfaces';
import { validateOnBuild, validateOnEdit } from './account-validator';

const recordToValidAttributes = (
  record: Account_Record
): Account_ValidAttributes => {
  return {
    __state: 'Validated',
    ...record,
  };
};

const build = (
  input: Account_BuildInput
): E.Either<InvalidAttributesError, Account_BuiltAttributes> => {
  return pipe(input, validateOnBuild);
};

const edit =
  (item: Account_ValidAttributes) =>
  (
    input: Account_EditInput
  ): E.Either<InvalidAttributesError, Account_DraftAttributes> => {
    const newRecord: Account_EditInput = {
      ...item,
      ...input,
      __state: 'Unvalidated',
    };
    return pipe(newRecord, validateOnEdit);
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
