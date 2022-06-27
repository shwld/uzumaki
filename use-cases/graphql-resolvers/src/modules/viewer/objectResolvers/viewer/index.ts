import { ViewerResolvers } from '../../../../generated/resolversTypes';
import { toConnection } from '../../../../shared/helpers/connectionHelpers';

export const Viewer: ViewerResolvers = {
  todos: async (_parent, args, context) => {
    return toConnection(context.db.todo, args, { user: context.currentUser! });
  },
};
