import { z } from 'zod';
import { genericValidator } from '../../shared/validator';
import { projectValidator } from '../project/projectValidator';
import { userValidator } from '../user';

export const projectMemberValidator = {
  id: z.string().uuid(),
  projectId: projectValidator.id,
  userId: genericValidator.id,
  createdByInvitationId: z.string().uuid().optional(),
  role: z.enum(['OWNER', 'MEMBER', 'VIEWER']),
  name: z.string().min(1),
  avatarImageUrl: userValidator.avatarImageUrl,
};

export const projectMemberValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...projectMemberValidator,
  })
  .strict();
