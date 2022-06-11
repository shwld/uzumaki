import { shield, allow } from 'graphql-shield';
import { todoCreateMutationPermission } from './modules/todo/mutationResolvers/todo.create/permission';
import { todoPermission } from './modules/todo/objectResolvers/todo/todoPermissions';
import { userPermission } from './modules/viewer/objectResolvers/user/userPermissions';
import { viewerPermission } from './modules/viewer/objectResolvers/viewer/viewerPermissions';
import { viewerQueryPermissions } from './modules/viewer/queryResolvers/viewer/viewerQueriesPermissions';
import { isAuthenticated } from './shared/rules/isAuthenticated';

export const permissions = shield(
  {
    Query: {
      '*': isAuthenticated,
      ...viewerQueryPermissions,
    },
    Mutation: {
      '*': isAuthenticated,
      ...todoCreateMutationPermission,
    },
    ...viewerPermission,
    ...todoPermission,
    ...userPermission,
  },
  {
    fallbackRule: allow,
  }
);
