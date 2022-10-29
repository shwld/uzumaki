import { z } from 'zod';
import { genericValidator, validateWith } from '../../lib/validator';

export const validators = {
  __state: genericValidator.__state,
  id: genericValidator.id,
  uid: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(1),
  avatarImageUrl: z.string().url(),
  createdAt: genericValidator.createdAt,
  updatedAt: genericValidator.updatedAt,
};
const schema = z.object(validators).strict();
const validate = validateWith(schema);

export const UserValidator = {
  validators,
  schema,
  validate,
};
