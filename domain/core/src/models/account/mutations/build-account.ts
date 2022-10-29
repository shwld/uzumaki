import { InvalidAttributesError } from '../../../lib/error';
import type { Account_Attributes } from '../account-interfaces';
import { AccountValidator } from '../account-validator';
import { pipe, Result, map } from '../../../lib/result';
import { BuiltState, ID, STATE_IS_BUILT } from '../../../lib/interfaces';
import { z } from 'zod';
import { genericValidator, validateWith } from '../../../lib/validator';

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
    BuiltState {
  createdById: string;
}

/**
 * Validation
 */
export const validationSchema = z
  .object({
    ...AccountValidator.validators,
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
    {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    validateWith(validationSchema),
    map(v => ({
      ...v,
      __state: STATE_IS_BUILT,
    }))
  );
};
