import { z } from 'zod';
import { genericValidator, validateWith } from '../../lib/validator';
import { ProjectMemberValidator } from '../project-member';

export const validators = {
  id: genericValidator.id,
  email: z.string().email(),
  role: ProjectMemberValidator.validators.role,
  projectId: z.string().uuid(),
  membershipId: z.string().uuid().nullable(),
  createdAt: genericValidator.createdAt,
  updatedAt: genericValidator.updatedAt,
};
const schema = z.object(validators).strict();
const validate = validateWith(schema);

export const ProjectMemberInvitationValidator = {
  validators,
  schema,
  validate,
};
