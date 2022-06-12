import { GraphqlServerContext } from '../../context';
import { Resolvers } from '../../generated/resolversTypes';
import * as todoMutationResolvers from './mutationResolvers/todo.create';
import { todoResolver } from './objectResolvers/todo/todoResolver';
import { todoCreateMutationPermission } from './mutationResolvers/todo.create/permission';
import { todoPermission } from './objectResolvers/todo/todoPermissions';
import { createTodoArgsValidationSchema } from './mutationResolvers/todo.create/validation';

const permissions = {
  Query: {},
  Mutation: {
    ...todoCreateMutationPermission,
  },
  ...todoPermission,
};

const resolvers: Resolvers<GraphqlServerContext> = {
  Query: {},
  Mutation: {
    ...todoMutationResolvers,
  },
  Todo: todoResolver,
};

export const todoModule = {
  resolvers,
  permissions,
};
