import { ViewerResolvers } from '../../../../generated/resolvers-types';
import { toConnection } from '../../../../shared/helpers/connection-helpers';

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
  invitationToken(_parent, args, context, _info) {
    return context.db.projectMemberInvitation.findTokenBy({
      confirmationToken: args.confirmationToken,
    });
  },
};