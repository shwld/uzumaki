import { z } from 'zod';
import { genericValidator } from '../../shared/validator';
import { projectValidator } from '../project/projectValidator';
import { userValidator } from '../user';

export const projectMemberValidator = {
  projectId: projectValidator.id,
  userId: userValidator.id,
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
