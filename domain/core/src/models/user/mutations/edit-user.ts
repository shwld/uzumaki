import { InvalidAttributesError } from '../../../lib/error';
import type { User_Attributes } from '../user-interfaces';
import { UserValidator } from '../user-validator';
import { pipe, Result, map } from '../../../lib/result';
import { DraftState, ID, STATE_IS_DRAFT } from '../../../lib/interfaces';

/**
 * Interfaces
 */
export interface User_EditInput {
  name?: string;
}

export interface User_DraftAttributes extends User_Attributes, DraftState {}

/**
 * Mutation
 */
export const edit =
  (input: User_EditInput) =>
  (
    item: User_Attributes
  ): Result<InvalidAttributesError, User_DraftAttributes> => {
    const newRecord: User_Attributes = {
      ...item,
      ...input,
    };
    return pipe(
      newRecord,
      UserValidator.validate,
      map(v => ({ ...v, __state: STATE_IS_DRAFT }))
    );
  };
