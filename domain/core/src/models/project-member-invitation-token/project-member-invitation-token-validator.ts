import { z } from 'zod';
import { genericValidator, validateWith } from '../../shared/validator';
import { ProjectMemberInvitationValidator } from '../project-member-invitation/project-member-invitation-validator';

const validators = {
  id: genericValidator.id,
  invitationId: ProjectMemberInvitationValidator.validators.id,
  projectId: ProjectMemberInvitationValidator.validators.projectId,
  role: ProjectMemberInvitationValidator.validators.role,
  email: ProjectMemberInvitationValidator.validators.email,
  expiredAt: z.date(),
  state: z.enum(['INVITING', 'JOINED', 'EXPIRED']),
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
