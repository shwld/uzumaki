import { StoryValidator } from 'core-domain';
import { z } from 'zod';

export const destroyStoryArgsValidationSchema = z.object({
  input: StoryValidator.schema.pick({
    id: true,
  }),
});
