import { storyValidationSchema } from 'core-domain';
import { z } from 'zod';

export const updateStateToNextStoryArgsValidationSchema = z.object({
  input: storyValidationSchema.pick({
    id: true,
  }),
});
