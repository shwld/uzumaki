import { z } from 'zod';
import { Result, toResult } from '../../..';
import { InvalidAttributesError } from '../../shared/error';
import {
  BaseAttributes,
  STATE_IS_VALIDATED,
  UnvalidatedState,
  ValidState,
} from '../../shared/interfaces';
import { genericValidator, validateWith } from '../../shared/validator';

/**
 * Interfaces
 */
export interface Account_Attributes extends BaseAttributes {
  name: string;
  createdById: string | null;
}

export interface Account_ValidAttributes
  extends Account_Attributes,
    ValidState {}

/**
 * Validator
 */
export const accountValidator = {
  id: genericValidator.id,
  name: z.string().min(1),
  createdById: genericValidator.id.nullable(),
};

/**
 * ValidationSchema
 */
export const accountValidationSchema = z.object(accountValidator).strict();

/**
 * Methods
 */
export const validate = validateWith(accountValidationSchema);
