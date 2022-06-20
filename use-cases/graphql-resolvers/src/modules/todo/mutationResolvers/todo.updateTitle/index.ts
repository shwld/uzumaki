import { pipe } from 'fp-ts/function';
import {
  createMutationResolver,
  invalidArgumentsResult,
  MutationResolver,
  unauthorizedResult,
} from '../../../../shared/helpers/resolverHelpers';
import { updateTodoTitleArgsValidationSchema } from './validation';

const authorized: MutationResolver<'updateTodoTitle'> = async (config) => {
  if (config.context.currentUser == null) return unauthorizedResult();

  const todo = await config.context.db.todo.findBy({
    id: config.args.input.id,
    user: config.context.currentUser!,
  });

  if (todo == null) return unauthorizedResult();

  return config;
};

const validated: MutationResolver<'updateTodoTitle'> = (config) => {
  const result = updateTodoTitleArgsValidationSchema.safeParse(config.args);
  if (!result.success) return invalidArgumentsResult(result.error);

  return config;
};

const resolve: MutationResolver<'updateTodoTitle'> = async ({
  args,
  context,
}) => {
  const todo = await context.db.todo.findBy({
    id: args.input.id,
    user: context.currentUser!,
  });
  const newTodo = await pipe(
    todo!.updateTitle(args.input.title),
    context.db.todo.update
  );
  return {
    __typename: 'UpdateTodoTitleSuccessResult',
    result: newTodo,
  };
};

export const updateTodoTitle = createMutationResolver(
  'createTodo',
  authorized,
  validated,
  resolve
);
