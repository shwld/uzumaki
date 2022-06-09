import { shield, allow } from 'graphql-shield';
import { todoMutationsPermissions } from './mutationResolvers/todo/todoMutationsPermissions';
import { isAuthenticated } from './shared/rules/isAuthenticated';

export const permissions = shield(
  {
    Query: {
      '*': isAuthenticated,
    },
    Mutation: {
      '*': isAuthenticated,
      ...todoMutationsPermissions,
    },
  },
  {
    fallbackRule: allow,
  }
);
