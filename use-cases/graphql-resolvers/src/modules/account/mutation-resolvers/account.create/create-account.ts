import { AccountEntity, AccountMutations, AccountPolicy } from 'core-domain';
import { andThen, map, resolve, pipe } from 'core-domain/lib';
import { STATE_IS_UNVALIDATED } from 'core-domain/src/shared/interfaces';
import { MutationResolvers } from '../../../../generated/resolversTypes';
import { handleError } from '../../../../shared/helpers/handle-error';
import { validateArguments } from '../../../../shared/helpers/validation-helper';
import { createAccountArgsValidationSchema } from './create-account-validation';

export const createAccount: Required<MutationResolvers>['createAccount'] =
  async (parent, args, context, info) => {
    const result = await pipe(
      { parent, args, context, info },
      AccountPolicy.authorizeCreating({ user: context.currentUser }),
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
