import { z } from 'zod';
import { genericValidator, validateWith } from '../../shared/validator';

export const validators = {
  id: genericValidator.id,
  velocity: z.number().int().min(0),
  createdAt: genericValidator.createdAt,
  updatedAt: genericValidator.updatedAt,
};
const schema = z.object(validators).strict();
const validate = validateWith(schema);

export const ProjectBoardStatusValidator = {
  validators,
  schema,
  validate,
};
