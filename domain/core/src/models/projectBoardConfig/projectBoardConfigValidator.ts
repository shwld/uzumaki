import { z } from 'zod';
import { genericValidator } from '../../shared/validator';

export const projectBoardConfigValidator = {
  id: z.string().uuid(),
  initialVelocity: z.number().int().min(0),
  startOn: z.date().optional(),
  startIterationOn: z.enum([
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ]),
  iterationLength: z.number().int().min(1).max(2),
};

export const projectBoardConfigValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...projectBoardConfigValidator,
  })
  .strict();
