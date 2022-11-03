import { AccountEntity, AccountMutations, AccountPolicy } from 'core-domain';
import { andThen, map, resolve, pipe } from 'core-domain/lib';
import { MutationResolvers } from '../../../../generated/resolversTypes';
import { handleError } from '../../../../shared/helpers/handle-error';
import { validateArguments } from '../../../../shared/helpers/validation-helper';
import { updateAccountArgsValidationSchema } from './update-account-validation';

export const updateAccount: Required<MutationResolvers>['updateAccount'] =
  async (parent, args, context, info) => {
    const result = await pipe(
      context.db.account.findBy({ id: args.input.id }),
      map(account => ({
        parent,
        args,
        context,
        info,
        account,
        user: context.currentUser,
      })),
      andThen(AccountPolicy.authorize(context.db)),
      andThen(validateArguments(updateAccountArgsValidationSchema)),
      andThen(({ args, account }) =>
        pipe(
          account,
          AccountMutations.edit({
            name: args.input.name,
          })
        )
      ),
      andThen(context.db.account.update),
      map(
        v =>
          ({
            __typename: 'UpdateAccountSuccessResult',
            result: AccountEntity(v),
          } as const)
      ),
      handleError,
      resolve
    );

    return result;
  };
