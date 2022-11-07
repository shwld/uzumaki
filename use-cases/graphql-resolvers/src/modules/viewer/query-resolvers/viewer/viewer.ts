import { QueryResolvers } from '../../../../generated/resolvers-types';

export type ViewerQueryResolvers = Pick<QueryResolvers, 'viewer'>;

export const viewer: ViewerQueryResolvers['viewer'] = (
  _parent,
  args,
  ctx,
  _info
) => {
  return ctx.currentUser;
};
