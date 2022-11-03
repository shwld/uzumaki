import { GraphqlServerContext } from '../../context';
import { Resolvers } from '../../generated/resolvers-types';
import * as queryResolvers from './queryResolvers';
import * as objectResolvers from './objectResolvers';

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
