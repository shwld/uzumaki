import { TodoEntity } from 'core-domain';
import { allow, and, rule, shield } from 'graphql-shield';
import { isAuthenticated } from './rules/isAuthenticated';
import { RuleFunction } from './rules/types';

const todoIsOwned: RuleFunction<{}, TodoEntity> = (parent, _args, ctx) => {
  return parent.userId === ctx.currentUser?.id;
};

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
  Todo: and(isAuthenticated, rule()(todoIsOwned)),
};

export const permissionMiddleware = shield(permission, {
  fallbackRule: allow,
});
