import { z } from 'zod';
import { genericValidator, validateWith } from '../../lib/validator';

const validators = {
  id: genericValidator.id,
  expiredAt: z.date(),
  createdAt: genericValidator.createdAt,
  updatedAt: genericValidator.updatedAt,
};
const schema = z.object(validators).strict();
const validate = validateWith(schema);

export const ProjectMemberValidator = {
  validators,
  schema,
  validate,
};
