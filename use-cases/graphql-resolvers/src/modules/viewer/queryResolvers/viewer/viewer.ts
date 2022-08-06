import { QueryResolvers } from '../../../../generated/resolversTypes';
import { viewerSubscription } from '../../subscriptionResolvers/viewerSubscriptions';

export type ViewerQueryResolvers = Pick<QueryResolvers, 'viewer'>;

export const viewer: ViewerQueryResolvers['viewer'] = (
  _parent,
  args,
  ctx,
  _info
) => {
  // setTimeout(() => {
  //   console.log('-------------------------------', viewerSubscription);
  //   viewerSubscription.subscribe().next();
  // }, 2000);
  return ctx.currentUser;
};
