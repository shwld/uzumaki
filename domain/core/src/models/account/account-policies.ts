import { NotAuthorizedError } from '../../lib/error';
import { Result, toResult } from '../../lib/result';
import { RequiredNonNull } from '../../lib/interfaces';
import { UserEntity } from '../user';

type CanCreate = {
  user?: UserEntity | null;
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
};
