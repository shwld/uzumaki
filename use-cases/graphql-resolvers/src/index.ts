import { makeExecutableSchema } from '@graphql-tools/schema';
import * as merge from 'deepmerge';
import { applyMiddleware } from 'graphql-middleware';
import { GraphqlServerContext } from './context';
import { Resolvers } from './generated/resolversTypes';
import { typeDefs } from './generated/typeDefs';
import { todoModule } from './modules/todo';
import { viewerModule } from './modules/viewer';
import { permissions } from './permissions';
export * from './auth';
export * from './context';
export * from './permissions';

const executableSchema = makeExecutableSchema<GraphqlServerContext>({
  typeDefs,
  resolvers: merge.all<Resolvers<GraphqlServerContext>>([
    todoModule,
    viewerModule,
  ]),
});

export const schema = applyMiddleware(executableSchema, permissions);
