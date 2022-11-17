import { StoryValidator } from 'core-domain';
import { z } from 'zod';

export const destroyStoryArgsValidationSchema = z.object({
  input: z.object({
    id: StoryValidator.validators.id,
  }),
});
