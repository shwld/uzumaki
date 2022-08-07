import { GraphqlServerContext } from '../../context';
import { Resolvers } from '../../generated/resolversTypes';
// import * as queryResolvers from './queryResolvers';
import * as mutationResolvers from './mutationResolvers';
import * as objectResolvers from './objectResolvers';
import * as subscriptionResolvers from './subscriptionResolvers';

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
