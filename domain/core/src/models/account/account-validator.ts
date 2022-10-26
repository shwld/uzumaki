import { z } from 'zod';
import { Result, toResult } from '../../..';
import { InvalidAttributesError } from '../../shared/error';
import { BaseAttributes, ValidState } from '../../shared/interfaces';
import { genericValidator, validateWith } from '../../shared/validator';

/**
 * Validator
 */
export const accountValidator = {
  id: genericValidator.id,
  name: z.string().min(1),
  createdById: genericValidator.id.nullable(),
  createdAt: genericValidator.createdAt,
  updatedAt: genericValidator.updatedAt,
};

/**
 * ValidationSchema
 */
export const accountValidationSchema = z.object(accountValidator).strict();

/**
 * Methods
 */
export const validate = validateWith(accountValidationSchema);
