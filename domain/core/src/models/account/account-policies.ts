import { NotAuthorizedError } from '../../shared/error';
import { Result } from '../../shared/functional';
import { UserEntity } from '../user';

type CanCreate = {
  user?: UserEntity | null;
};
export const AccountPolicy = {
  canCreate(args: CanCreate): Result<NotAuthorizedError, CanCreate> {
    if (args.user == null) {
      return Result.left(new NotAuthorizedError('Out of scope'));
    }

    return Result.right(args);
  },
};
