import { buildTodoByUser } from 'core-domain';
import { db } from 'db';
import { MutationResolvers } from '../../generated/resolversTypes';
import { mutationResult } from '../../shared/results/mutationResult';

export const createTodo: Extract<
  MutationResolvers['createTodo'],
  Function
> = async (_parent, args, ctx, _info) => {
  const newTodo = buildTodoByUser(ctx.currentUser!, args.input);
  await db.todo.create({ ...newTodo, userId: ctx.currentUser!.id });
  return mutationResult(newTodo);
};
