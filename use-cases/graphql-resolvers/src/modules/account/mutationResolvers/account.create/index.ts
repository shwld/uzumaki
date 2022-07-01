import { buildAccount } from 'core-domain';
import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { createAccountArgsValidationSchema } from './validation';

export const createAccount = createMutationResolver(
  'createAccount',
  {
    validationSchema: createAccountArgsValidationSchema,
    authorize: ({ context }) => {
      return context.currentUser != null;
    },
  },
  async ({ args, context }) => {
    const newAccount = buildAccount({
      id: args.input.id,
      name: args.input.name,
    });
    context.db.account.create(newAccount);
    return {
      __typename: 'CreateAccountSuccessResult',
      result: newAccount,
    };
  }
);
