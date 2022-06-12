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
import { shield, allow } from 'graphql-shield';
import { defaultPermission } from './permission';

const permissions = merge.all<any>([
  defaultPermission,
  todoModule.permissions,
  viewerModule.permissions,
]);
export const permissionMiddleware = shield(permissions, {
  fallbackRule: allow,
});

const executableSchema = makeExecutableSchema<GraphqlServerContext>({
  typeDefs,
  resolvers: merge.all<Resolvers<GraphqlServerContext>>([
    todoModule.resolvers,
    viewerModule.resolvers,
  ]),
});

// FIXME: use graphql-shield
// export const schema = applyMiddleware(executableSchema, permissionMiddleware);
export const schema = executableSchema;
