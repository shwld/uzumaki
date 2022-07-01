import { z } from 'zod';
import { genericValidator } from '../../shared/validator';

export const accountValidator = {
  id: z.string().uuid(),
  name: z.string().min(1),
};

export const accountValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...accountValidator,
  })
  .strict();
