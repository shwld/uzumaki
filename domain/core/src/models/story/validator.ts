import { z } from 'zod';
import { genericValidator } from '../../shared/validator';
import { projectValidator } from '../project';
import { userValidator } from '../user';

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
  points: z.number().nullable(),
  releaseDate: z.date().nullable(),
  position: z.enum(['DONE', 'CURRENT', 'BACKLOG', 'ICEBOX']),
  priority: z.number(),

  requesterId: userValidator.id.nullable(),
  projectId: projectValidator.id,
};

export const storyValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...storyValidator,
  })
  .strict();
