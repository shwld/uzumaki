import { updateMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { updateAccountArgsValidationSchema } from './update-account-validation';

export const updateAccount = updateMutationResolver(
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

import { AccountEntity, AccountMutations, AccountPolicy } from 'core-domain';
import { andThen, map, resolve, pipe } from 'core-domain/lib';
import { STATE_IS_UNVALIDATED } from 'core-domain/src/shared/interfaces';
import { MutationResolvers } from '../../../../generated/resolversTypes';
import { handleError } from '../../../../shared/helpers/handleError';
import { validateArguments } from '../../../../shared/helpers/validationHelper';
import { updateAccountArgsValidationSchema } from './update-account-validation';

export const updateAccount: Required<MutationResolvers>['updateAccount'] =
  async (parent, args, context, info) => {
    const result = await pipe(
      { parent, args, context, info },
      AccountPolicy.authorize({ user: context.currentUser }),
      andThen(validateArguments(updateAccountArgsValidationSchema)),
      map(v => ({
        __state: STATE_IS_UNVALIDATED,
        id: v.args.input.id,
        name: v.args.input.name,
        updatedById: v.user.id,
      })),
      andThen(AccountMutations.build),
      andThen(context.db.account.update),
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
