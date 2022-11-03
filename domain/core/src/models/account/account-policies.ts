import { andThen, Either, map, mapLeft } from '../../shared/result';
import { NotAuthorizedError, RepositoryRuntimeError } from '../../shared/error';
import { pipe, Result, toResult } from '../../shared/result';
import { RequiredNonNull } from '../../shared/interfaces';
import { UserEntity } from '../user';
import { AccountEntity } from '.';
import {
  Aggregates,
  NodesWrapper,
} from '../../aggregates/repository-interfaces';
import { requireObjectArgument } from '../../shared';

type CanCreate = {
  user?: UserEntity | null;
};

export const AccountPolicy = {
  applyScope(
    db: Aggregates,
    user: UserEntity
  ): Result<RepositoryRuntimeError, NodesWrapper<AccountEntity>> {
    return db.account.findMany({ user });
  },
  authorize:
    (db: Aggregates) =>
    <
      T extends {
        user: UserEntity | null;
        account: AccountEntity | null;
      }
    >({
      user,
      account,
      ...options
    }: T): Result<
      NotAuthorizedError,
      Omit<T, 'user' | 'account'> &
        RequiredNonNull<{ user: UserEntity; account: AccountEntity }>
    > => {
      return pipe(
        { user, account },
        requireObjectArgument,
        andThen(input =>
          pipe(
            input,
            db.account.findMembership,
            map(membership => ({
              membership,
              account: input.account,
              user: input.user,
            }))
          )
        ),
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
