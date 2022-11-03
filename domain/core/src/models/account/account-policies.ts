import { andThen, Either, map, mapLeft } from '../../shared/result';
import { NotAuthorizedError, RepositoryRuntimeError } from '../../shared/error';
import { pipe, Result, toResult } from '../../shared/result';
import { ID, RequiredNonNull } from '../../shared/interfaces';
import { UserEntity } from '../user';
import { Account_ValidAttributes } from './account-interfaces';
import {
  Aggregates,
  NodesWrapper,
} from '../../aggregates/repository-interfaces';
import { AccountMembershipEntity } from '../account-membership';

type CanCreate = {
  user?: UserEntity | null;
};

export const AccountPolicy = {
  applyScope(
    db: Aggregates,
    user: UserEntity
  ): Result<RepositoryRuntimeError, NodesWrapper<Account_ValidAttributes>> {
    return db.account.findMany({ user });
  },
  authorize:
    (db: Aggregates) =>
    <
      T extends {
        user: UserEntity | null;
        account: Account_ValidAttributes | null;
      }
    >({
      user,
      account,
      ...options
    }: T): Result<
      NotAuthorizedError,
      Omit<T, 'user' | 'account'> &
        RequiredNonNull<{ user: UserEntity; account: Account_ValidAttributes }>
    > => {
      return pipe(
        db.account.findMembership({
          user: user,
          account,
        }),
        map(v => ({
          membership: AccountMembershipEntity(v),
          account: account!,
          user: user!,
        })),
        andThen(({ membership, user, account }) =>
          membership.canAccountEdit()
            ? Result.right({ user, account, ...options })
            : Result.left(new NotAuthorizedError('Not Authorized'))
        ),
        mapLeft(NotAuthorizedError.from)
      );
    },
  authorizeCreating:
    (args: CanCreate) =>
    <T>(
      options: T
    ): Result<NotAuthorizedError, T & RequiredNonNull<CanCreate>> =>
      toResult(
        args.user == null
          ? Either.left(new NotAuthorizedError('Not Authorized'))
          : Either.right({ user: args.user, ...options })
      ),
};
