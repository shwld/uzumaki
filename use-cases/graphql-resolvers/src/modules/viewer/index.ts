import { GraphqlServerContext } from '../../context';
import { Resolvers } from '../../generated/resolversTypes';
import { viewerQueryResolvers } from './queryResolvers/viewer/viewerQueries';
import { userResolver } from './objectResolvers/user/userResolver';
import { viewerResolver } from './objectResolvers/viewer/viewerResolver';
import { userPermission } from './/objectResolvers/user/userPermissions';
import { viewerPermission } from './objectResolvers/viewer/viewerPermissions';
import { viewerQueryPermissions } from './queryResolvers/viewer/viewerQueriesPermissions';

const permissions = {
  Query: {
    ...viewerQueryPermissions,
  },
  Mutation: {},
  ...userPermission,
  ...viewerPermission,
};

const resolvers: Resolvers<GraphqlServerContext> = {
  Query: {
    ...viewerQueryResolvers,
  },
  Mutation: {},
  User: userResolver,
  Viewer: viewerResolver,
};

export const viewerModule = {
  resolvers,
  permissions,
};
