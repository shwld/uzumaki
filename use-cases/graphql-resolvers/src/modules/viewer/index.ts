import { GraphqlServerContext } from '../../context';
import { Resolvers } from '../../generated/resolversTypes';
import { viewerQueryResolvers } from './queryResolvers/viewer/viewerQueries';
import { userResolver } from './objectResolvers/user/userResolver';
import { viewerResolver } from './objectResolvers/viewer/viewerResolver';

export const viewerModule: Resolvers<GraphqlServerContext> = {
  Query: {
    ...viewerQueryResolvers,
  },
  Mutation: {},
  User: userResolver,
  Viewer: viewerResolver,
};
