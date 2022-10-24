import { z } from 'zod';
import { genericValidator } from '../../shared/validator';

export const projectMemberInvitationTokenValidator = {
  id: z.string().uuid(),
  expiredAt: z.date(),
};

export const projectMemberInvitationTokenValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...projectMemberInvitationTokenValidator,
  })
  .strict();
