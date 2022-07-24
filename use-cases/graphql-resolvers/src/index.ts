import { makeExecutableSchema } from '@graphql-tools/schema';
import * as merge from 'deepmerge';
import { applyMiddleware } from 'graphql-middleware';
import { GraphqlServerContext } from './context';
import { Resolvers } from './generated/resolversTypes';
import { typeDefs } from './generated/typeDefs';
import { accountModule } from './modules/account';
import { storyModule } from './modules/story';
import { projectModule } from './modules/project';
import { viewerModule } from './modules/viewer';
export * from './auth';
export * from './context';
export * from './interfaces';
import { permissionMiddleware } from './middlewares/shield';

const executableSchema = makeExecutableSchema<GraphqlServerContext>({
  typeDefs,
  resolvers: merge.all<Resolvers<GraphqlServerContext>>([
    storyModule.resolvers,
    projectModule.resolvers,
    accountModule.resolvers,
    viewerModule.resolvers,
  ]),
});

export const schema = applyMiddleware(executableSchema, permissionMiddleware);
