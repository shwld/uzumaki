import { ViewerResolvers } from '../../../../generated/resolversTypes';
import { toConnection } from '../../../../shared/helpers/connectionHelpers';

export const Viewer: ViewerResolvers = {
  async accounts(_parent, args, context) {
    return toConnection(context.db.account, args, {
      user: context.currentUser!,
    });
  },
  async project(parent, args, context, _info) {
    const project = await context.db.project.findByUser({
      id: args.id,
      user: parent,
    });

    return project;
  },
  invitation(_parent, args, context, _info) {
    console.log('!!!!!!!!!', args);
    return context.db.projectMemberInvitation.findByToken({
      tokenId: args.tokenId,
    });
  },
};
