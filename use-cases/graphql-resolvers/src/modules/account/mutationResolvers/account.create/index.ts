import { buildAccount } from 'core-domain';
import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { createAccountArgsValidationSchema } from './validation';

export const createAccount = createMutationResolver(
  'createAccount',
  {
    validationSchema: createAccountArgsValidationSchema,
    authorize: ({ context }) => {
      return context.currentUser;
    },
  },
  async ({ args, context }, accountOwner) => {
    const newAccount = buildAccount({
      id: args.input.id,
      name: args.input.name,
    });
    await context.db.account.create(newAccount, accountOwner);
    return {
      __typename: 'CreateAccountSuccessResult',
      result: newAccount,
    };
  }
);
