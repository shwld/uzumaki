import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './graphql/generated/typeDefs';
import { resolvers } from './graphql/resolvers';
// import * as graphqlAuth from './graphql/auth';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// export const auth = graphqlAuth;
