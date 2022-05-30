import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './graphql/generated/typeDefs';
import { resolvers } from './graphql/resolvers';
export * from './graphql/auth';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
