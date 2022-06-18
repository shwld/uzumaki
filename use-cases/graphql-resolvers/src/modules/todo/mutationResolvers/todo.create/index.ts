import { buildTodoByUser } from 'core-domain';
import { MutationResolvers } from '../../../../generated/resolversTypes';
import {
  createResolver,
  invalidArgumentsResult,
  Resolver,
  unauthorizedResult,
} from '../../../../shared/helpers/resolverHelpers';
import { createTodoArgsValidationSchema } from './validation';

type CreateTodoResolver = Resolver<
  Parameters<Extract<MutationResolvers['createTodo'], Function>>
>;

const authorized: CreateTodoResolver = (config) => {
  if (config.context.currentUser == null) return unauthorizedResult();

  return config;
};

const validated: CreateTodoResolver = (config) => {
  const result = createTodoArgsValidationSchema.safeParse(config.args);
  if (!result.success) return invalidArgumentsResult(result.error);

  return config;
};

const resolve: CreateTodoResolver = async ({ args, context }) => {
  const newTodo = buildTodoByUser(context.currentUser!, args.input);
  await context.db.todo.create(newTodo);
  return {
    __typename: 'CreateTodoSuccessResult',
    result: newTodo,
  };
};

export const createTodo = createResolver(authorized, validated, resolve);
