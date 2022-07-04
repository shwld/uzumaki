import { allow, and, shield } from 'graphql-shield';
import { isAuthenticated } from './shield/rules/isAuthenticated';

const permission = {
  Query: {
    viewer: isAuthenticated,
  },
  Mutation: {
    createAccount: isAuthenticated,
    updateAccount: isAuthenticated,
  },
  User: allow,
  Viewer: isAuthenticated,
  Account: and(isAuthenticated),
};

export const permissionMiddleware = shield(permission, {
  fallbackRule: allow,
});
