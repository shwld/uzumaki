import { createServer } from '@graphql-yoga/node';
import { useLogger, useSchema, useTiming } from '@envelop/core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './graphql/generated/typeDefs';
import { resolvers } from './graphql/resolvers';
import { useAuth } from './graphql/auth';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const graphQLServer = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  plugins: [useSchema(schema), useLogger(), useTiming(), useAuth()],
});

graphQLServer.start();
