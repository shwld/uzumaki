import { makeExecutableSchema } from '@graphql-tools/schema';
import * as merge from 'deepmerge';
import { applyMiddleware } from 'graphql-middleware';
import { GraphqlServerContext } from './context';
import { Resolvers } from './generated/resolversTypes';
import { typeDefs } from './generated/typeDefs';
import { todoModule } from './modules/todo';
import { viewerModule } from './modules/viewer';
export * from './auth';
export * from './context';
import { permissionMiddleware } from './middlewares/permission';

const executableSchema = makeExecutableSchema<GraphqlServerContext>({
  typeDefs,
  resolvers: merge.all<Resolvers<GraphqlServerContext>>([
    todoModule.resolvers,
    viewerModule.resolvers,
  ]),
});

export const schema = applyMiddleware(executableSchema, permissionMiddleware);
