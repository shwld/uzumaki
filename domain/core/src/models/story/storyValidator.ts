import { z } from 'zod';
import { genericValidator } from '../../shared/validator';
import { projectValidator } from '../project';

export const storyValidator = {
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string(),
  state: z.enum([
    'UNSTARTED',
    'STARTED',
    'FINISHED',
    'DELIVERED',
    'REJECTED',
    'ACCEPTED',
  ]),
  kind: z.enum(['FEATURE', 'BUG', 'CHORE', 'RELEASE']),
  points: z.number().optional(),
  releaseDate: z.date().optional(),
  completedAt: z.date().optional(),

  position: z.enum(['DONE', 'CURRENT', 'BACKLOG', 'ICEBOX']),
  priority: z.number(),

  requesterId: genericValidator.id,
  projectId: projectValidator.id,
};

export const storyValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...storyValidator,
  })
  .strict();
