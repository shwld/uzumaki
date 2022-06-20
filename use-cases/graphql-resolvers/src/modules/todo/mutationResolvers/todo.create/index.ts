import { buildTodoByUser } from 'core-domain';
import {
  createMutationResolver,
  invalidArgumentsResult,
  MutationResolver,
  unauthorizedResult,
} from '../../../../shared/helpers/resolverHelpers';
import { createTodoArgsValidationSchema } from './validation';

const authorized: MutationResolver<'createTodo'> = (config) => {
  if (config.context.currentUser == null) return unauthorizedResult();

  return config;
};

const validated: MutationResolver<'createTodo'> = (config) => {
  const result = createTodoArgsValidationSchema.safeParse(config.args);
  if (!result.success) return invalidArgumentsResult(result.error);

  return config;
};

const resolve: MutationResolver<'createTodo'> = async ({ args, context }) => {
  const newTodo = buildTodoByUser(context.currentUser!, args.input);
  await context.db.todo.create(newTodo);
  return {
    __typename: 'CreateTodoSuccessResult',
    result: newTodo,
  };
};

export const createTodo = createMutationResolver(
  'createTodo',
  authorized,
  validated,
  resolve
);
