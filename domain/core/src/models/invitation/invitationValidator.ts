import { z } from 'zod';
import { genericValidator } from '../../shared/validator';
import { projectMemberValidator } from '../projectMember';

export const invitationValidator = {
  id: z.string().uuid(),
  email: z.string().email(),
  role: projectMemberValidator.role,
  projectId: z.string().uuid(),
  membershipId: z.string().uuid().optional(),
};

export const invitationValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...invitationValidator,
  })
  .strict();
