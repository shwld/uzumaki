import { buildTodoByUser } from 'core-domain';
import { db } from 'db';
import {
  createMutationFn,
  mutationResult,
} from '../../shared/helpers/mutationHelpers';
import { createTodoArgsValidationSchema } from './validation';

export const createTodo = createMutationFn(
  'createTodo',
  { validationSchema: createTodoArgsValidationSchema, requireAuth: true },
  async (_parent, args, ctx, _info) => {
    const newTodo = buildTodoByUser(ctx.currentUser!, args.input);
    await db.todo.create({ ...newTodo, userId: ctx.currentUser!.id });
    return mutationResult(newTodo);
  }
);
