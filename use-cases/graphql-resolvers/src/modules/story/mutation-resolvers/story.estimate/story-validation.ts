import { StoryValidator } from 'core-domain';
import { z } from 'zod';

export const estimateStoryArgsValidationSchema = z.object({
  input: z.object({
    id: StoryValidator.validators.id,
    points: StoryValidator.validators.points,
  }),
});
