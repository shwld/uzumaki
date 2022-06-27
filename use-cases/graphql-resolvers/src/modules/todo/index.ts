import { GraphqlServerContext } from '../../context';
import { Resolvers } from '../../generated/resolversTypes';
import * as mutationResolvers from './mutationResolvers';
import * as objectResolvers from './objectResolvers';

const resolvers: Resolvers<GraphqlServerContext> = {
  Query: {},
  Mutation: {
    ...mutationResolvers,
  },
  ...objectResolvers,
};

export const todoModule = {
  resolvers,
};
