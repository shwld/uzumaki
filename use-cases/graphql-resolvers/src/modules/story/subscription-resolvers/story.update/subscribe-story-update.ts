import { StoryPolicy } from 'core-domain';
import { Either, map, pipe } from 'core-domain/lib';
import { GraphqlServerContext } from '../../../../context';
import { SubscriptionResolvers } from '../../../../generated/resolvers-types';

export const subscribeStoryUpdate: SubscriptionResolvers<
  GraphqlServerContext,
  {}
>['subscribeStoryUpdate'] = {
  subscribe: async function* (_parent, args, context, _info) {
    if (context.currentUser == null) throw new Error('Not Authorized');

    const authorized = await StoryPolicy(context.db).authorizeUpdating({
      user: context.currentUser,
      projectId: args.projectId,
    })();
    if (Either.isLeft(authorized)) throw new Error('Not Authorized');

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
