import { z } from 'zod';
import { genericValidator, validateWith } from '../../shared/validator';

const validators = {
  __state: genericValidator.__state,
  id: genericValidator.id,
  name: z.string().min(1),
  avatarImageUrl: z.string().url(),
};
const schema = z.object(validators);
const validate = validateWith(schema);

export const UserProfileValidator = {
  validators,
  schema,
  validate,
};
