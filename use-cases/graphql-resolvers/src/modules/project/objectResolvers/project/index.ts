import { ProjectResolvers } from '../../../../generated/resolversTypes';
import { toConnection } from '../../../../shared/helpers/connectionHelpers';

export const Project: ProjectResolvers = {
  stories(parent, args, context, _info) {
    return toConnection(context.db.story, args, {
      project: parent,
    });
  },
};
