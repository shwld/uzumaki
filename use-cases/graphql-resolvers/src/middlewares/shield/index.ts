import { allow, shield } from 'graphql-shield';
import { isAuthenticated } from './rules/isAuthenticated';

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
  Account: isAuthenticated,
};

export const permissionMiddleware = shield(permission, {
  fallbackRule: allow,
});
