import { GraphqlServerContext } from '../../context';
import { Resolvers } from '../../generated/resolvers-types';
import * as queryResolvers from './query-resolvers';
import * as objectResolvers from './object-resolvers';

const resolvers: Resolvers<GraphqlServerContext> = {
  Query: {
    ...queryResolvers,
  },
  Mutation: {},
  ...objectResolvers,
};

export const viewerModule = {
  resolvers,
};
