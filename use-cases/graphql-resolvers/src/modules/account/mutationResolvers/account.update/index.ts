import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { updateAccountArgsValidationSchema } from './validation';

export const updateAccount = createMutationResolver(
  'updateAccount',
  {
    validationSchema: updateAccountArgsValidationSchema,
    async authorize({ args, context }) {
      if (context.currentUser == null) return;

      const account = await context.db.account.findBy({
        id: args.input.id,
        user: context.currentUser,
      });
      if (account == null) return;

      const membership = await context.db.account.membership(
        account,
        context.currentUser
      );

      return membership?.canAccountEdit() && account;
    },
  },
  async ({ args, context }, account) => {
    const newAccount = account.update({ name: args.input.name });
    context.db.account.save(newAccount);
    return {
      __typename: 'UpdateAccountSuccessResult',
      result: newAccount,
    };
  }
);
