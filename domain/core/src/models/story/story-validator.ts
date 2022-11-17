import { z } from 'zod';
import { genericValidator, validateWith } from '../../shared/validator';
import { StoryKind, StoryPosition, StoryState } from './story-interfaces';

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
const schema = attachRefinements(z.object(validators));
const validate = validateWith(schema);
function attachRefinements<
  O extends {
    state: StoryState;
    position?: StoryPosition;
    points?: number | null;
    kind: StoryKind;
  },
  T extends z.ZodTypeDef,
  I
>(schema: z.ZodType<O, T, I>) {
  return schema.superRefine((val, ctx) => {
    if (
      val.kind === 'FEATURE' &&
      val.state !== 'UNSTARTED' &&
      val.points == null
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['points'],
        message: 'Must a estimation to get started',
      });
    }
    if (val.position === 'DONE' && val.state !== 'ACCEPTED') {
      ctx.addIssue({
        code: 'custom',
        path: ['points'],
        message: 'Must be accepted to be placed at current position',
      });
    }
  });
}

export const StoryValidator = {
  validators,
  schema,
  validate,
  attachRefinements,
};
