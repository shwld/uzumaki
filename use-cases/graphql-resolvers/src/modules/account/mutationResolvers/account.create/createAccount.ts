import { AccountEntity, Account_BuildInput, Fp } from 'core-domain';
import { pipe } from 'fp-ts/lib/function';
import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { createAccountArgsValidationSchema } from './createAccountValidation';

export const createAccount = createMutationResolver(
  'createAccount',
  {
    validationSchema: createAccountArgsValidationSchema,
    authorize: ({ context }) => {
      return context.currentUser;
    },
  },
  async ({ args, context }, accountOwner) => {
    const input: Account_BuildInput = {
      __state: 'Unvalidated',
      id: args.input.id,
      name: args.input.name,
      createdById: accountOwner.id,
    };
    const result = pipe(
      input,
      AccountEntity.build,
      Fp.E.map(context.db.account.create),
      Fp.E.match(
        left => ({
          __typename: 'InvalidArgumentsResult',
          result: left,
        }),
        Fp.TE.match(
          left => ({
            __typename: 'InternalErrorResult',
            result: left,
          }),
          right => ({
            __typename: 'CreateAccountSuccessResult',
            result: right,
          })
        )
      )
    );
    return result;
  }
);
