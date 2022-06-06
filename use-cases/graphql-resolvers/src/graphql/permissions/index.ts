import { shield, allow } from 'graphql-shield';
import { todoMutationPermissions } from '../resolvers/todo/todoPermissions';
import { isAuthenticated } from './shared/rules';

export const permissions = shield(
  {
    Query: {
      '*': isAuthenticated,
    },
    Mutation: {
      '*': isAuthenticated,
      ...todoMutationPermissions,
    },
  },
  {
    fallbackRule: allow,
  }
);
