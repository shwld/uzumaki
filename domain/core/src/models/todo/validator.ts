import { z } from 'zod';
import { genericValidator } from '../shared/validator';

export const todoValidator = {
  title: z.string().min(1),
  done: z.boolean(),
  userId: z.string().uuid(),
};

export const todoValidationSchema = z
  .object({
    ...genericValidator,
    ...todoValidator,
  })
  .strict();
