import { GraphqlServerContext } from '../../context';
import { Resolvers } from '../../generated/resolversTypes';
import * as queryResolvers from './queryResolvers';
import * as objectResolvers from './objectResolvers';
import { viewerSubscription } from './subscriptionResolvers/viewerSubscriptions';

const resolvers: Resolvers<GraphqlServerContext> = {
  Query: {
    ...queryResolvers,
  },
  Mutation: {},
  ...objectResolvers,
  Subscription: {
    greetings: viewerSubscription,
  },
};

export const viewerModule = {
  resolvers,
};
