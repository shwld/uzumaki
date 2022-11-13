import { StoryValidator } from 'core-domain';
import { z } from 'zod';

export const updateStoryArgsValidationSchema = z.object({
  input: z.object({
    id: StoryValidator.validators.id,
    title: StoryValidator.validators.title,
    description: StoryValidator.validators.description,
    state: StoryValidator.validators.state,
    kind: StoryValidator.validators.kind,
    points: StoryValidator.validators.points,
    releaseDate: StoryValidator.validators.releaseDate.optional(),
    requesterId: StoryValidator.validators.requesterId.optional(),
  }),
});
