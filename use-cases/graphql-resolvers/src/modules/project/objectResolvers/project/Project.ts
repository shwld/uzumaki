import {
  ProjectResolvers,
  StoryPosition,
} from '../../../../generated/resolversTypes';
import { toConnection } from '../../../../shared/helpers/connectionHelpers';

const asc = 'asc' as const;
const desc = 'desc' as const;

export const Project: ProjectResolvers = {
  stories(parent, args, context, _info) {
    return toConnection(context.db.story, args, {
      project: parent,
      position: args.input?.position,
      orderBy: {
        position:
          args.input?.position?.includes(StoryPosition.Current) &&
          args.input?.position?.includes(StoryPosition.Backlog)
            ? desc
            : asc,
      },
    });
  },
  story(parent, args, context, _info) {
    return context.db.story.findBy({ id: args.id, project: parent });
  },
  members(parent, args, context, _info) {
    return toConnection(context.db.projectMember, args, { project: parent });
  },
  invitations(parent, args, context, _info) {
    return toConnection(context.db.projectMemberInvitation, args, {
      project: parent,
    });
  },
};
