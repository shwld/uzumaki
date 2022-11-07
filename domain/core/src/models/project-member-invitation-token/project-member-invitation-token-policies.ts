import { andThen, mapLeft } from '../../shared/result';
import { NotAuthorizedError } from '../../shared/error';
import { pipe, Result } from '../../shared/result';
import { RequiredNonNull } from '../../shared/interfaces';
import { UserEntity } from '../user';
import { ProjectMemberInvitationTokenEntity } from '.';
import { Aggregates } from '../../aggregates/repository-interfaces';
import { requireObjectArgument } from '../../shared';

export const ProjectMemberInvitationTokenPolicy = (db: Aggregates) => ({
  authorizeJoining: <
    T extends {
      user: UserEntity | null;
      token: ProjectMemberInvitationTokenEntity | null;
    }
  >({
    user,
    token,
    ...options
  }: T): Result<
    NotAuthorizedError,
    Omit<T, 'user' | 'token'> &
      RequiredNonNull<{
        user: UserEntity;
        token: ProjectMemberInvitationTokenEntity;
      }>
  > => {
    return pipe(
      { user, token },
      requireObjectArgument,
      andThen(({ user, token }) =>
        user.email === token.email
          ? Result.right({ user, token, ...options })
          : Result.left(
              new NotAuthorizedError(`Not Authorized: email mismatch`)
            )
      ),
      mapLeft(NotAuthorizedError.from)
    );
  },
});
