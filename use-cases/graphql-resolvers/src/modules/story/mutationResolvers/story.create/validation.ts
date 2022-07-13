import { storyValidationSchema } from 'core-domain';
import { z } from 'zod';

export const createStoryArgsValidationSchema = z.object({
  input: storyValidationSchema.pick({
    id: true,
    title: true,
    description: true,
    state: true,
    kind: true,
    points: true,
    releaseDate: true,
    projectId: true,
    position: true,
    priority: true,
    requesterId: true,
  }),
});
