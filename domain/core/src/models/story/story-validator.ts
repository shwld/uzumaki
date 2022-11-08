import { z } from 'zod';
import { genericValidator, validateWith } from '../../shared/validator';

const validators = {
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
  points: z.number().min(0).nullable(),
  releaseDate: z.date().nullable(),
  completedAt: z.date().nullable(),

  position: z.enum(['DONE', 'CURRENT', 'BACKLOG', 'ICEBOX']),
  priority: z.number(),

  requesterId: genericValidator.id.nullable(),
  projectId: genericValidator.id,
  createdAt: genericValidator.createdAt,
  updatedAt: genericValidator.updatedAt,
};
const schema = z.object(validators).strict();
const validate = validateWith(schema);

export const StoryValidator = {
  validators,
  schema,
  validate,
};
