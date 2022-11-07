import { GraphqlServerContext } from '../../context';
import { Resolvers } from '../../generated/resolvers-types';
// import * as queryResolvers from './queryResolvers';
import * as mutationResolvers from './mutation-resolvers';
import * as objectResolvers from './object-resolvers';
import * as subscriptionResolvers from './subscription-resolvers';

const resolvers: Resolvers<GraphqlServerContext> = {
  Query: {
    // ...queryResolvers,
  },
  Mutation: {
    ...mutationResolvers,
  },
  Subscription: {
    ...subscriptionResolvers,
  },
  ...objectResolvers,
};

export const storyModule = {
  resolvers,
};
