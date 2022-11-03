import {
  projectValidationSchema,
  projectBoardConfigValidationSchema,
} from 'core-domain';
import { z } from 'zod';

export const createProjectArgsValidationSchema = z.object({
  input: projectValidationSchema
    .pick({
      id: true,
      name: true,
      description: true,
      privacy: true,
      accountId: true,
    })
    .merge(
      projectBoardConfigValidationSchema.pick({
        initialVelocity: true,
      })
    ),
});
