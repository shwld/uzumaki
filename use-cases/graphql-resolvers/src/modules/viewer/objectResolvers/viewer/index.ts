import { ViewerResolvers } from '../../../../generated/resolversTypes';
import { toConnection } from '../../../../shared/helpers/connectionHelpers';

export const Viewer: ViewerResolvers = {
  accounts: async (_parent, args, context) => {
    return toConnection(context.db.account, args, {
      user: context.currentUser!,
    });
  },
};
