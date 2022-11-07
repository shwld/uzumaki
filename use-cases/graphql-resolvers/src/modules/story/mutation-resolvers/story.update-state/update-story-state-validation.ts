import { storyValidationSchema } from 'core-domain';
import { z } from 'zod';

export const updateStoryStateArgsValidationSchema = z.object({
  input: storyValidationSchema.pick({
    id: true,
    state: true,
  }),
});
