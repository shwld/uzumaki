import { QueryResolvers } from '../../../../generated/resolversTypes';

export type ViewerQueryResolvers = Pick<QueryResolvers, 'viewer'>;

const viewerResolver: ViewerQueryResolvers = {
  viewer(_parent, args, ctx, _info) {
    return ctx.currentUser;
  },
};

export default viewerResolver;
