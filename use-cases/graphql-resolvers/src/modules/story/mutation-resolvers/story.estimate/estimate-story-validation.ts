import { StoryValidator } from 'core-domain';
import { z } from 'zod';

export const estimateStoryArgsValidationSchema = z.object({
  input: StoryValidator.schema.pick({
    id: true,
    points: true,
  }),
});
