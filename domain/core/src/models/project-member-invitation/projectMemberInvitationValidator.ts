import { z } from 'zod';
import { genericValidator } from '../../shared/validator';
import { projectMemberValidator } from '../project-member';

export const projectMemberInvitationValidator = {
  id: z.string().uuid(),
  email: z.string().email(),
  role: projectMemberValidator.role,
  projectId: z.string().uuid(),
  membershipId: z.string().uuid().optional(),
};

export const projectMemberInvitationValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...projectMemberInvitationValidator,
  })
  .strict();
