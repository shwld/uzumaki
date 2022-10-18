import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { InvalidAttributesError } from '../../shared/error';
import type {
  Account_Attributes,
  Account_ValidAttributes,
  Account_Record,
} from './account-interfaces';
import { valid } from './account-validator';

const recordToValidAttributes = (
  record: Account_Record
): Account_ValidAttributes => {
  return {
    attributesType: 'valid',
    ...record,
  };
};

const edit =
  (item: Account_ValidAttributes) =>
  (
    input: Account_Attributes
  ): E.Either<InvalidAttributesError, Account_ValidAttributes> => {
    const newRecord = { ...item, ...input, attributesType: undefined };
    return pipe(newRecord, valid);
  };

export function AccountEntity(item: Account_ValidAttributes) {
  return {
    edit: edit(item),
  };
}

AccountEntity.fromRecord = recordToValidAttributes;
