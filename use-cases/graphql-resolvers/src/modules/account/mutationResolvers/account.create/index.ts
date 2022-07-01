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
    // TODO
    return {
      __typename: 'CreateaccountSuccessResult',
      // TODO result: ,
    };
  }
);
