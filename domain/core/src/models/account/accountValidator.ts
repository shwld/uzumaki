import { z } from 'zod';
import { genericValidator } from '../../shared/validator';
import { userValidator } from '../user';

export const accountValidator = {
  id: z.string().uuid(),
  name: z.string().min(1),
  createdById: userValidator.id.optional(),
};

export const accountValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...accountValidator,
  })
  .strict();
