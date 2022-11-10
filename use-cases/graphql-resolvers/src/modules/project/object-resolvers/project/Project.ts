import {
  ProjectResolvers,
  StoryPosition,
} from '../../../../generated/resolvers-types';
import { toConnection } from '../../../../shared/helpers/connection-helpers';
import { match } from 'ts-pattern';
import { getOrThrow } from 'core-domain/lib';

const desc = 'desc' as const;

export const Project: ProjectResolvers = {
  stories(parent, args, context, _info) {
    const position = args.position ?? StoryPosition.Current;
    const orderBy = match(position)
      .with(StoryPosition.Done, () => ({ completedAt: desc }))
      .otherwise(() => ({ priority: desc }));
    const searchArgs = match(position)
      .with(StoryPosition.Current, () => ({}))
      .otherwise(() => args);

    return toConnection(context.db.story, searchArgs, {
      project: parent,
      position,
      orderBy,
    });
  },
  async story(_parent, args, context, _info) {
    const result = await getOrThrow(context.db.story.findBy({ id: args.id }));
    return result ?? undefined; // FIXME: want to use null
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
