import { dateStringValidator, StoryValidator } from 'core-domain';
import { z } from 'zod';

export const updateStoryArgsValidationSchema = z.object({
  input: StoryValidator.attachRefinements(
    z.object({
      id: StoryValidator.validators.id,
      title: StoryValidator.validators.title,
      description: StoryValidator.validators.description,
      state: StoryValidator.validators.state,
      kind: StoryValidator.validators.kind,
      points: StoryValidator.validators.points.optional(),
      releaseDate: dateStringValidator.nullable().optional(),
      requesterId: StoryValidator.validators.requesterId.optional(),
    })
  ),
});
