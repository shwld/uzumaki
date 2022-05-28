import { GraphqlServerContext } from './context';
import { Resolvers } from './generated/resolversTypes';

export const resolvers: Resolvers<GraphqlServerContext> = {
  Query: {
    sample: async (_, params, ctx) => {
      return 'Hello world';
    },
  },
  // Mutation: {
  // },
};
