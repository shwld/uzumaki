import { z } from 'zod';
import { genericValidator, validateWith } from '../../shared/validator';

export const validators = {
  __state: genericValidator.__state,
  userId: genericValidator.id,
  accountId: genericValidator.id,
  role: z.enum(['OWNER', 'MEMBER', 'VIEWER']),
  createdAt: genericValidator.createdAt,
  updatedAt: genericValidator.updatedAt,
};
const schema = z.object(validators).strict();
const validate = validateWith(schema);

export const AccountMembershipValidator = {
  validators,
  schema,
  validate,
};
