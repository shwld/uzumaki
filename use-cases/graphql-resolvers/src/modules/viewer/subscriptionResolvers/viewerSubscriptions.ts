import { GraphqlServerContext } from '../../../context';
import { SubscriptionResolvers } from '../../../generated/resolversTypes';

export const viewerSubscription: SubscriptionResolvers<
  GraphqlServerContext,
  {}
>['greetings'] = {
  subscribe: async function* () {
    for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
      console.log('---------------------', hi);
      yield { greetings: hi };
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  },
};
