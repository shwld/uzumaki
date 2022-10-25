import { InvalidAttributesError } from '../../../shared/error';
import type { Account_Attributes } from '../account-interfaces';
import { pipe, Result, map } from '../../../shared/functional';
import {
  ID,
  RemovingState,
  STATE_IS_REMOVING,
} from '../../../shared/interfaces';
import { validate } from '../account-validator';

/**
 * Interfaces
 */
export interface Account_RemoveInput {
  id: ID;
}

export interface Account_RemoveAttributes
  extends Account_Attributes,
    RemovingState {}

/**
 * Mutation
 */
export const remove =
  (input: Account_RemoveInput) =>
  (
    item: Account_Attributes
  ): Result<InvalidAttributesError, Account_RemoveAttributes> => {
    const newRecord: Account_Attributes = {
      ...item,
      ...input,
    };
    return pipe(
      newRecord,
      validate,
      map(v => ({ ...v, __state: STATE_IS_REMOVING }))
    );
  };
