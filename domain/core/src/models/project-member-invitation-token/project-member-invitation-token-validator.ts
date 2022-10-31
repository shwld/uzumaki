import { z } from 'zod';
import { genericValidator, validateWith } from '../../shared/validator';

const validators = {
  id: genericValidator.id,
  invitationId: genericValidator.id,
  expiredAt: z.date(),
  createdAt: genericValidator.createdAt,
  updatedAt: genericValidator.updatedAt,
};
const schema = z.object(validators).strict();
const validate = validateWith(schema);

export const ProjectMemberInvitationTokenValidator = {
  validators,
  schema,
  validate,
};
