import { z } from 'zod';
import { genericValidator } from '../../shared/validator';

export const accountMembershipValidator = {
  userId: genericValidator.id,
  accountId: genericValidator.id,
  role: z.enum(['OWNER', 'MEMBER', 'VIEWER']),
};

export const accountMembershipValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...accountMembershipValidator,
  })
  .strict();
