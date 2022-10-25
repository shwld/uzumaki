import { InvalidAttributesError } from '../../../shared/error';
import type { Account_Attributes } from '../account-interfaces';
import { accountValidator } from '../account-validator';
import { pipe, Result, map } from '../../../shared/functional';
import { BuiltState, ID, STATE_IS_BUILT } from '../../../shared/interfaces';
import { z } from 'zod';
import { genericValidator, validateWith } from '../../../shared/validator';

/**
 * Interfaces
 */
export interface Account_BuildInput {
  id: ID;
  name: string;
  createdById: string;
}

export interface Account_BuiltAttributes
  extends Account_Attributes,
    BuiltState {}

/**
 * Validation
 */
export const validationSchema = z
  .object({
    ...accountValidator,
    createdById: genericValidator.id,
  })
  .strict();

/**
 * Mutation
 */
export const build = (
  input: Account_BuildInput
): Result<InvalidAttributesError, Account_BuiltAttributes> => {
  return pipe(
    input,
    validateWith(validationSchema),
    map(v => ({ ...v, __state: STATE_IS_BUILT }))
  );
};
