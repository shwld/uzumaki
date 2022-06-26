import { TodoEntity } from 'core-domain';
import { allow, and, rule, shield } from 'graphql-shield';
import { isAuthenticated } from './shield/rules/isAuthenticated';
import { createRule } from './shield/rules/types';

const todoIsOwned = createRule<{}, TodoEntity>((parent, _args, ctx) => {
  return parent.userId === ctx.currentUser?.id;
});

const permission = {
  Query: {
    viewer: isAuthenticated,
  },
  Mutation: {
    createTodo: isAuthenticated,
    updateTodoTitle: isAuthenticated,
  },
  User: allow,
  Viewer: isAuthenticated,
  Todo: and(isAuthenticated, todoIsOwned),
};

export const permissionMiddleware = shield(permission, {
  fallbackRule: allow,
});
