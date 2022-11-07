import { storyValidationSchema } from 'core-domain';
import { z } from 'zod';

export const updateStoryArgsValidationSchema = z.object({
  input: storyValidationSchema.pick({
    id: true,
    title: true,
    description: true,
    state: true,
    kind: true,
    points: true,
    releaseDate: true,
    requesterId: true,
  }),
});
