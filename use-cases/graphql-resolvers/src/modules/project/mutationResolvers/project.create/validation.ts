import { projectValidationSchema } from 'core-domain';
import { z } from 'zod';

export const createProjectArgsValidationSchema = z.object({
  input: projectValidationSchema.pick({
    id: true,
  }),
});
