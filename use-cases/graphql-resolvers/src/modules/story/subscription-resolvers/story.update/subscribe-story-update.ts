import { GraphqlServerContext } from '../../../../context';
import { SubscriptionResolvers } from '../../../../generated/resolvers-types';

export const subscribeStoryUpdate: SubscriptionResolvers<
  GraphqlServerContext,
  {}
>['subscribeStoryUpdate'] = {
  subscribe: async function* (_parent, args, context, _info) {
    if (context.currentUser == null) throw new Error('Not Authorized');

    const project = await context.db.project.findByUser({
      id: args.projectId,
      user: context.currentUser,
    });
    if (project == null) throw new Error('Not Authorized');

    const subscribed = context.pubsub.story.subscribe({
      projectId: args.projectId,
    });
    for await (const it of subscribed) {
      if (it.triggeredBy.id === context.currentUser.id) continue;

      yield {
        subscribeStoryUpdate: it.object,
      };
    }
  },
};
