import {
  ProjectResolvers,
  StoryPosition,
} from '../../../../generated/resolversTypes';
import { toConnection } from '../../../../shared/helpers/connectionHelpers';
import { match } from 'ts-pattern';

const desc = 'desc' as const;

export const Project: ProjectResolvers = {
  async stories(parent, args, context, _info) {
    const position = args.position ?? StoryPosition.Current;
    const orderBy = match(position)
      .with(StoryPosition.Done, () => ({ completedAt: desc }))
      .otherwise(() => ({ priority: desc }));
    const searchArgs = match(position)
      .with(StoryPosition.Current, () => ({}))
      .otherwise(() => args);
    console.log('---------------', { args, position, orderBy, searchArgs });

    const result = await toConnection(context.db.story, searchArgs, {
      project: parent,
      position,
      orderBy,
    });
    console.log({ result });

    return result;
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
