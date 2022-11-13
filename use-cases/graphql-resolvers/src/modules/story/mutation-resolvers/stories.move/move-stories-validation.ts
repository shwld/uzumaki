import { z } from 'zod';

export const moveStoriesArgsValidationSchema = z.object({
  input: z.object({
    projectId: z.string().uuid(),
    stories: z.array(
      z.object({
        id: z.string().uuid(),
        priority: z.number(),
        position: z.enum(['ICEBOX', 'BACKLOG', 'CURRENT']),
      })
    ),
  }),
});
