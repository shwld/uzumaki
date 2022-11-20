import { GraphqlServerContext } from '../../context';
import { Resolvers } from '../../generated/resolvers-types';
// import * as queryResolvers from './queryResolvers';
import * as mutationResolvers from './mutation-resolvers';
import * as objectResolvers from './object-resolvers';

const resolvers: Resolvers<GraphqlServerContext> = {
  Query: {
    // ...queryResolvers,
  },
  Mutation: {
    ...mutationResolvers,
  },
  ...objectResolvers,
};

export const userProfileModule = {
  resolvers,
};
