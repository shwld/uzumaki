import { buildTodoByUser } from 'core-domain';
import { MutationResolvers } from '../../generated/resolversTypes';
import { mutationResult } from '../../shared/results/mutationResult';

export type TodoMutationResolvers = Pick<MutationResolvers, 'createTodo'>;

export const todoMutationResolvers: TodoMutationResolvers = {
  createTodo(_parent, args, ctx, _info) {
    const newTodo = buildTodoByUser(ctx.currentUser!, args.input);
    return mutationResult(newTodo);
  },
};
