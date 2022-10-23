import {
  AccountEntity,
  AccountMutations,
  Account_BuildInput,
  andThen,
  handleErrorAsync,
  mapAsync,
  patternMatch,
  resolveAsync,
  toAsync,
} from 'core-domain';
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
    const result = await pipe(
      AccountMutations.build(input),
      toAsync,
      andThen(context.db.account.create),
      mapAsync(
        v =>
          ({
            __typename: 'CreateAccountSuccessResult',
            result: AccountEntity(v),
          } as const)
      ),
      handleErrorAsync(v =>
        patternMatch(v)
          .with(
            { _tag: 'InvalidAttributesError' },
            e =>
              ({
                __typename: 'InvalidArgumentsResult',
                issues: e.issues,
              } as const)
          )
          .otherwise(
            e =>
              ({
                __typename: 'InternalErrorResult',
                errorMessage: e.message,
              } as const)
          )
      ),
      resolveAsync
    );

    return result;
  }
);
