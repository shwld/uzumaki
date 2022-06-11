import { makeExecutableSchema } from '@graphql-tools/schema';
import * as merge from 'deepmerge';
import { GraphqlServerContext } from './context';
import { Resolvers } from './generated/resolversTypes';
import { typeDefs } from './generated/typeDefs';
import { todoModule } from './modules/todo';
import { viewerModule } from './modules/viewer';
export * from './auth';
export * from './context';
export * from './permissions';

export const schema = makeExecutableSchema<GraphqlServerContext>({
  typeDefs,
  resolvers: merge.all<Resolvers<GraphqlServerContext>>([
    todoModule,
    viewerModule,
  ]),
});
