import { z } from 'zod';
import { genericValidator } from '../../shared/validator';

export const projectUserValidator = {
  id: z.string().uuid(),
  role: z.enum(['OWNER', 'MEMBER', 'VIEWER']),
  name: z.string().min(1),
};

export const projectUserValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...projectUserValidator,
  })
  .strict();
