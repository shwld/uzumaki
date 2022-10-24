import { z } from 'zod';
import { genericValidator } from '../../shared/validator';

export const projectValidator = {
  id: z.string().uuid(),
  accountId: genericValidator.id,
  createdById: genericValidator.id.optional(),
  name: z.string().min(1),
  description: z.string(),
  privacy: z.enum(['PRIVATE', 'PUBLIC']),
  boardConfigId: z.string().uuid(),
  boardStatusId: z.string().uuid(),
};

export const projectValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...projectValidator,
  })
  .strict();
