import { StoryValidator } from 'core-domain';
import { z } from 'zod';

export const createStoryArgsValidationSchema = z.object({
  input: StoryValidator.attachRefinements(
    z.object({
      id: StoryValidator.validators.id,
      title: StoryValidator.validators.title,
      description: StoryValidator.validators.description,
      state: StoryValidator.validators.state,
      kind: StoryValidator.validators.kind,
      points: StoryValidator.validators.points.optional(),
      completedAt: StoryValidator.validators.completedAt.optional(),
      releaseDate: StoryValidator.validators.releaseDate.optional(),
      projectId: StoryValidator.validators.projectId,
      position: StoryValidator.validators.position,
      priority: StoryValidator.validators.priority,
      requesterId: StoryValidator.validators.requesterId.optional(),
    })
  ),
});
