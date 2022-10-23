import {
  AccountEntity,
  AccountMutations,
  AccountPolicy,
  Account_BuildInput,
  andThen,
  handleErrorAsync,
  mapAsync,
  patternMatch,
  resolveAsync,
  toAsync,
} from 'core-domain';
import { pipe } from 'fp-ts/lib/function';
import { MutationResolvers } from '../../../../generated/resolversTypes';
import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { validateArguments } from '../../../../shared/helpers/validationHelper';
import { createAccountArgsValidationSchema } from './createAccountValidation';

export const createAccount: MutationResolvers['createAccount'] = async (
  _parent,
  args,
  context,
  info
) => {
  // export const createAccount = createMutationResolver(
  //   'createAccount',
  //   {
  //     validationSchema: createAccountArgsValidationSchema,
  //     authorize: ({ context }) => {
  //       return context.currentUser;
  //     },
  //   },
  //   async ({ args, context }, accountOwner) => {

  // const validInput = createAccountArgsValidationSchema.safeParse(args.input)
  // if (validInput.success) {
  //   validInput.data
  // }
  const validInput = validateArguments(args, createAccountArgsValidationSchema);
  AccountPolicy.canCreate({ user: context.currentUser });

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
};
