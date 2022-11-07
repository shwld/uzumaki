import { storyValidationSchema } from 'core-domain';
import { z } from 'zod';

export const estimateStoryArgsValidationSchema = z.object({
  input: storyValidationSchema.pick({
    id: true,
    points: true,
  }),
});
