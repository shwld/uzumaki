import { InvalidAttributesError } from '../../../shared/error';
import type { Account_Attributes } from '../account-interfaces';
import { validate } from '../account-validator';
import { pipe, Result, map } from '../../../shared/functional';
import { DraftState, ID, STATE_IS_DRAFT } from '../../../shared/interfaces';

/**
 * Interfaces
 */
export interface Account_EditInput {
  id: ID;
  name: string;
}

export interface Account_DraftAttributes
  extends Account_Attributes,
    DraftState {}

/**
 * Mutation
 */
export const edit =
  (input: Account_EditInput) =>
  (
    item: Account_Attributes
  ): Result<InvalidAttributesError, Account_DraftAttributes> => {
    const newRecord: Account_Attributes = {
      ...item,
      ...input,
    };
    return pipe(
      newRecord,
      validate,
      map(v => ({ ...v, __state: STATE_IS_DRAFT }))
    );
  };
