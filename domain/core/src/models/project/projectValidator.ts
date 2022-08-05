import { z } from 'zod';
import { genericValidator } from '../../shared/validator';
import { accountValidator } from '../account';
import { userValidator } from '../user';

export const projectValidator = {
  id: z.string().uuid(),
  accountId: accountValidator.id,
  createdById: userValidator.id.optional(),
  name: z.string().min(1),
  description: z.string(),
  privacy: z.enum(['PRIVATE', 'PUBLIC']),
  currentVelocity: z.number(),
  boardConfigId: z.string().uuid(),
};

export const projectValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...projectValidator,
  })
  .strict();
