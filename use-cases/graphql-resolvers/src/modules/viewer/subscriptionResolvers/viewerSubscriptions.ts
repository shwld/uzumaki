import { GraphqlServerContext } from '../../../context';
import { SubscriptionResolvers } from '../../../generated/resolversTypes';

export const viewerSubscription: SubscriptionResolvers<
  GraphqlServerContext,
  {}
>['greetings'] = {
  subscribe: async function* (_parent, args, context, _info) {
    const stories = context.pubsub.story.subscribe();
    for await (const hi of stories) {
      console.log('---------------------', hi);
      yield { greetings: hi.id };
    }
  },
};
