import { buildTodoByUser } from 'core-domain';
import { createMutationFn } from '../../../../shared/helpers/mutationHelpers';
import { createTodoArgsValidationSchema } from './validation';

export const createTodo = createMutationFn(
  'createTodo',
  {
    validationSchema: createTodoArgsValidationSchema,
    authorize: ({ context }) => {
      return context.currentUser != null;
    },
  },
  async ({ args, context }) => {
    const newTodo = buildTodoByUser(context.currentUser!, args.input);
    await context.db.todo.create(newTodo);
    return {
      __typename: 'CreateTodoSuccessResult',
      result: newTodo,
    };
  }
);
