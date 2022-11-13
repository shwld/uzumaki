import { z } from 'zod';
import { genericValidator, validateWith } from '../../shared/validator';

const validators = {
  __state: genericValidator.__state,
  id: genericValidator.id,
  name: z.string().min(1),
  createdById: genericValidator.id.nullable(),
  createdAt: genericValidator.createdAt,
  updatedAt: genericValidator.updatedAt,
};
const schema = z.object(validators).strict();
const validate = validateWith(schema);

export const AccountValidator = {
  validators,
  schema,
  validate,
};
