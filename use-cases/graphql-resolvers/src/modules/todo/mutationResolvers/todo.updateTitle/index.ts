import { db } from 'db';
import { pipe } from 'fp-ts/function';
import { createMutationFn } from '../../../../shared/helpers/mutationHelpers';
import { updateTodoTitleArgsValidationSchema } from './validation';

export const updateTodoTitle = createMutationFn(
  'updateTodoTitle',
  {
    validationSchema: updateTodoTitleArgsValidationSchema,
    async authorize({ args, context }) {
      const todo = await db.todo.find({
        id: args.input.id,
        user: context.currentUser!,
      });
      return [context.currentUser != null, todo];
    },
  },
  async ({ args }, todo) => {
    const newTodo = await pipe(
      todo.updateTitle(args.input.title),
      db.todo.update
    );
    return {
      __typename: 'UpdateTodoTitleSuccessResult',
      result: newTodo,
    };
  }
);
