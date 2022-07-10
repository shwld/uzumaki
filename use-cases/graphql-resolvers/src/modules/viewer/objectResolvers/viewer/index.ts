import { ViewerResolvers } from '../../../../generated/resolversTypes';
import { toConnection } from '../../../../shared/helpers/connectionHelpers';

export const Viewer: ViewerResolvers = {
  async accounts(_parent, args, context) {
    return toConnection(context.db.account, args, {
      user: context.currentUser!,
    });
  },
  async project(_parent, args, context, _info) {
    if (context.currentUser == null) return;
    const project = context.db.project.findByUser({
      id: args.id,
      user: context.currentUser,
    });

    return project;
  },
};
