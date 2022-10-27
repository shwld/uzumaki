import { z } from 'zod';
import { genericValidator, validateWith } from '../../shared/validator';
import { UserValidator } from '../user';

export const validators = {
  id: genericValidator.id,
  projectId: genericValidator.id,
  userId: genericValidator.id,
  role: z.enum(['OWNER', 'MEMBER', 'VIEWER']),
  createdAt: genericValidator.createdAt,
  updatedAt: genericValidator.updatedAt,
  user: UserValidator.schema.pick({
    id: true,
    name: true,
    avatarImageUrl: true,
  }),
};
const schema = z.object(validators).strict();
const validate = validateWith(schema);

export const ProjectMemberValidator = {
  validators,
  schema,
  validate,
};
