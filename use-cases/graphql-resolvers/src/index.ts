import { makeExecutableSchema } from '@graphql-tools/schema';
import * as merge from 'deepmerge';
import { applyMiddleware } from 'graphql-middleware';
import { GraphqlServerContext } from './context';
import { Resolvers } from './generated/resolvers-types';
import { typeDefs } from './generated/type-defs';
import { accountModule } from './modules/account';
import { userProfileModule } from './modules/user-profile';
import { storyModule } from './modules/story';
import { projectModule } from './modules/project';
import { viewerModule } from './modules/viewer';
export * from './auth';
export * from './context';
import { permissionMiddleware } from './middlewares/shield';

const executableSchema = makeExecutableSchema<GraphqlServerContext>({
  typeDefs,
  resolvers: merge.all<Resolvers<GraphqlServerContext>>([
    userProfileModule.resolvers,
    storyModule.resolvers,
    projectModule.resolvers,
    accountModule.resolvers,
    viewerModule.resolvers,
  ]),
});

export const schema = applyMiddleware(executableSchema, permissionMiddleware);
