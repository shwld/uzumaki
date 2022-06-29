import { z } from 'zod';
import { genericValidator } from '../shared/validator';

export const userValidator = {
  id: z.string().min(6),
  name: z.string().min(1),
  email: z.string().email(),
  avatarImageUrl: z.string().url(),
};

export const userValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...userValidator,
  })
  .strict();
