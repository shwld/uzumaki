import { db } from 'db';
import { pipe } from 'fp-ts/function';
import { createMutationFn } from '../../../../shared/helpers/mutationHelpers';
import { updateTodoTitleArgsValidationSchema } from './validation';

export const updateTodoTitle = createMutationFn(
  'updateTodoTitle',
  { validationSchema: updateTodoTitleArgsValidationSchema, requireAuth: true },
  async (_parent, args, ctx, _info) => {
    const todo = await db.todo.find({
      id: args.input.id,
      user: ctx.currentUser!,
    });
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
