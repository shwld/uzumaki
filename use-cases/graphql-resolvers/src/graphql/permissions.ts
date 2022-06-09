import { shield, allow } from 'graphql-shield';
import { todoMutationsPermissions } from './mutationResolvers/todo/todoMutationsPermissions';
import { todoPermission } from './objectResolvers/todo/todoPermissions';
import { userPermission } from './objectResolvers/user/userPermissions';
import { viewerPermission } from './objectResolvers/viewer/viewerPermissions';
import { viewerQueryPermissions } from './queryResolvers/viewer/viewerQueriesPermissions';
import { isAuthenticated } from './shared/rules/isAuthenticated';

export const permissions = shield(
  {
    Query: {
      '*': isAuthenticated,
      ...viewerQueryPermissions,
    },
    Mutation: {
      '*': isAuthenticated,
      ...todoMutationsPermissions,
    },
    ...viewerPermission,
    ...todoPermission,
    ...userPermission,
  },
  {
    fallbackRule: allow,
  }
);
