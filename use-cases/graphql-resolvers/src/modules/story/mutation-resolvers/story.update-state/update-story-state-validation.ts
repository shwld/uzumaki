import { StoryValidator } from 'core-domain';
import { z } from 'zod';

export const updateStoryStateArgsValidationSchema = z.object({
  input: z.object({
    id: StoryValidator.validators.id,
    state: StoryValidator.validators.state,
  }),
});
