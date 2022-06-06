import { buildTodoByUser } from 'core-domain';
import { MutationResolvers } from '../../generated/resolversTypes';

export type TodoMutationResolvers = Pick<MutationResolvers, 'createTodo'>;

export const TodoMutations: TodoMutationResolvers = {
  createTodo(_root, args, ctx, info) {
    const newTodo = buildTodoByUser(ctx.currentUser!, args.input);
    return {
      result: ctx.db.todo.create(newTodo),
    };
  },
};
