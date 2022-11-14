import { QueryResolvers } from '../../../../generated/resolvers-types';

export type ViewerQueryResolvers = Pick<QueryResolvers, 'viewer'>;

export const viewer: ViewerQueryResolvers['viewer'] = (
  _parent,
  _args,
  ctx,
  _info
) => {
  return ctx.currentUser;
};
