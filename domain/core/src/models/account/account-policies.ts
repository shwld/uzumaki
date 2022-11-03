import { NotAuthorizedError } from '../../shared/error';
import { Result, toResult } from '../../shared/result';
import { RequiredNonNull } from '../../shared/interfaces';
import { UserEntity } from '../user';
import { Account_ValidAttributes } from './account-interfaces';

type CanCreate = {
  user?: UserEntity | null;
};
type CanUpdate = {
  user?: UserEntity | null;
  account?: Account_ValidAttributes;
};

export const AccountPolicy = {
  authorizeCreating:
    (args: CanCreate) =>
    <T>(
      options: T
    ): Result<NotAuthorizedError, T & RequiredNonNull<CanCreate>> =>
      toResult(
        args.user == null
          ? Result.left(new NotAuthorizedError('Not Authorized'))
          : Result.right({ user: args.user, ...options })
      ),
  authorizeUpdating:
    (args: CanCreate) =>
    <T>(
      options: T
    ): Result<NotAuthorizedError, T & RequiredNonNull<CanUpdate>> =>
      toResult(
        args.user == null
          ? Result.left(new NotAuthorizedError('Not Authorized'))
          : Result.right({ user: args.user, account: args.account, ...options })
      ),
};
