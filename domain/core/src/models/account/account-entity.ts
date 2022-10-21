import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { InvalidAttributesError } from '../../shared/error';
import type {
  Account_Attributes,
  Account_BuildInput,
  Account_BuildValidInput,
  Account_EditInput,
  Account_EditValidInput,
  Account_Record,
  Account_RemoveValidInput,
} from './account-interfaces';
import { validateOnBuild, validateOnEdit } from './account-validator';

const recordToValidAttributes = (
  record: Account_Record
): Account_Attributes => {
  return {
    __state: 'Validated',
    ...record,
  };
};

const build = (
  input: Account_BuildInput
): E.Either<InvalidAttributesError, Account_BuildValidInput> => {
  return pipe(input, validateOnBuild);
};

const edit =
  (item: Account_Attributes) =>
  (
    input: Partial<Account_EditInput>
  ): E.Either<InvalidAttributesError, Account_EditValidInput> => {
    const newRecord: Account_EditInput = {
      id: item.id,
      name: item.name,
      ...input,
      __state: 'Unvalidated',
    };
    return pipe(newRecord, validateOnEdit);
  };

const remove = (item: Account_Attributes) => (): Account_RemoveValidInput => {
  return { ...item, __state: 'Removing' };
};

export function AccountEntity(item: Account_Attributes) {
  return {
    edit: edit(item),
    remove: remove(item),
  };
}

AccountEntity.build = build;
AccountEntity.fromRecord = recordToValidAttributes;
