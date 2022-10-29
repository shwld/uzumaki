import { z } from 'zod';
import { genericValidator, validateWith } from '../../lib/validator';

export const validators = {
  id: genericValidator.id,
  name: z.string().min(1),
  description: z.string(),
  privacy: z.enum(['PRIVATE', 'PUBLIC']),
  accountId: genericValidator.id,
  createdById: genericValidator.id.nullable(),
  boardConfigId: genericValidator.id,
  boardStatusId: genericValidator.id,
  createdAt: genericValidator.createdAt,
  updatedAt: genericValidator.updatedAt,
};
const schema = z.object(validators).strict();
const validate = validateWith(schema);

export const ProjectValidator = {
  validators,
  schema,
  validate,
};
