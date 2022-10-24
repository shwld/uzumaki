import { z } from 'zod';
import { genericValidator } from '../../shared/validator';

export const projectBoardStatusValidator = {
  id: z.string().uuid(),
  velocity: z.number().int().min(0),
};

export const projectBoardStatusValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...projectBoardStatusValidator,
  })
  .strict();
