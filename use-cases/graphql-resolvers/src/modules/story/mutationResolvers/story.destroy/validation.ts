import { storyValidationSchema } from 'core-domain';
import { z } from 'zod';

export const destroyStoryArgsValidationSchema = z.object({
  input: storyValidationSchema.pick({
    id: true,
  }),
});
