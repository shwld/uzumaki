import {
  AccountEntity,
  AccountMutations,
  AccountPolicy,
  andThen,
  map,
  resolve,
} from 'core-domain';
import { STATE_IS_UNVALIDATED } from 'core-domain/src/shared/interfaces';
import { pipe } from 'fp-ts/lib/function';
import { MutationResolvers } from '../../../../generated/resolversTypes';
import { handleError } from '../../../../shared/helpers/handleError';
import { validateArguments } from '../../../../shared/helpers/validationHelper';
import { createAccountArgsValidationSchema } from './createAccountValidation';

export const createAccount: MutationResolvers['createAccount'] = async (
  parent,
  args,
  context,
  info
) => {
  const result = await pipe(
    { parent, args, context, info },
    AccountPolicy.authorizeCreate({ user: context.currentUser }),
    andThen(validateArguments(createAccountArgsValidationSchema)),
    map(v => ({
      __state: STATE_IS_UNVALIDATED,
      id: v.args.input.id,
      name: v.args.input.name,
      createdById: v.user.id,
    })),
    andThen(AccountMutations.build),
    andThen(context.db.account.create),
    map(
      v =>
        ({
          __typename: 'CreateAccountSuccessResult',
          result: AccountEntity(v),
        } as const)
    ),
    handleError,
    resolve
  );

  return result;
};
