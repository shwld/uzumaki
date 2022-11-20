import { andThen, map, mapLeft } from '../../shared';
import { NotAuthorizedError, RuntimeError } from '../../shared/error';
import { pipe, Result } from '../../shared';
import { RequiredNonNull } from '../../shared/interfaces';
import { UserEntity } from '.';
import { Aggregates } from '../../aggregates/repository-interfaces';
import { requireObjectArgument } from '../../shared';

export const UserPolicy = (db: Aggregates) => ({
  authorize<
    T extends {
      user: UserEntity | null;
    }
  >({
    user,
    ...options
  }: T): Result<
    NotAuthorizedError,
    Omit<T, 'user'> & RequiredNonNull<{ user: UserEntity }>
  > {
    const result = pipe(
      { user },
      requireObjectArgument,
      andThen(input => {
        return pipe(
          {
            id: input.user.id,
          },
          db.user.find,
          map(user => ({ user, ...options }))
        );
      }),
      mapLeft(NotAuthorizedError.from)
    );

    return result;
  },
});

/**
 * PRIVATE
 */
