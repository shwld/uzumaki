import { pipe } from 'fp-ts/function';
import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { updateTodoTitleArgsValidationSchema } from './validation';

export const updateTodoTitle = createMutationResolver(
  'updateTodoTitle',
  {
    validationSchema: updateTodoTitleArgsValidationSchema,
    async authorize({ args, context }) {
      const todo = await context.db.todo.findBy({
        id: args.input.id,
        user: context.currentUser!,
      });
      return todo;
    },
  },
  async ({ args, context }, todo) => {
    const newTodo = await pipe(
      todo.updateTitle(args.input.title),
      context.db.todo.update
    );
    return {
      __typename: 'UpdateTodoTitleSuccessResult',
      result: newTodo,
    };
  }
);
