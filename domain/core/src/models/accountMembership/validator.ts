import { z } from 'zod';
import { genericValidator } from '../../shared/validator';
import { accountValidator } from '../account/validator';
import { userValidator } from '../user';

export const accountMembershipValidator = {
  userId: userValidator.id,
  accountId: accountValidator.id,
  role: z.enum(['OWNER', 'MEMBER', 'VIEWER']),
};

export const accountMembershipValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...accountMembershipValidator,
  })
  .strict();
