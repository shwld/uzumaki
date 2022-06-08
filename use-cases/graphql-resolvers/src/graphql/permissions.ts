import { shield, allow } from 'graphql-shield';
import { todoMutationPermissions } from './resolvers/todo/todoPermissions';
import { isAuthenticated } from './rules/isAuthenticated';

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
