import { andThen, map, mapLeft } from '../../shared/result';
import { NotAuthorizedError, RepositoryRuntimeError } from '../../shared/error';
import { pipe, Result } from '../../shared/result';
import { RequiredNonNull } from '../../shared/interfaces';
import { UserEntity } from '../user';
import { ProjectEntity } from '.';
import {
  Aggregates,
  NodesWrapper,
} from '../../aggregates/repository-interfaces';
import { AccountEntity } from '../account';
import { requireObjectArgument } from '../../shared';

export const ProjectPolicy = (db: Aggregates) => ({
  applyScope(
    user: UserEntity | null
  ): Result<RepositoryRuntimeError, NodesWrapper<ProjectEntity>> {
    return db.project.findMany({ user: user });
  },
  // authorize:
  //   (db: Aggregates) =>
  //   <
  //     T extends {
  //       user: UserEntity | null;
  //       project: ProjectEntity | null;
  //     }
  //   >({
  //     user,
  //     project,
  //     ...options
  //   }: T): Result<
  //     NotAuthorizedError,
  //     Omit<T, 'user' | 'project'> &
  //       RequiredNonNull<{ user: UserEntity; project: ProjectEntity }>
  //   > => {
  //     return pipe(
  //       db.project.find({
  //         id: project?.id,
  //       }),
  //       map(v => ({
  //         membership: ProjectMembership_ValidAttributes(v),
  //         project: project!,
  //         user: user!,
  //       })),
  //       andThen(({ membership, user, project }) =>
  //         membership.canProjectEdit()
  //           ? Result.right({ user, project, ...options })
  //           : Result.left(new NotAuthorizedError('Not Authorized'))
  //       ),
  //       mapLeft(NotAuthorizedError.from)
  //     );
  //   },
  authorizeCreating: <
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
    const result = pipe(
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
      map(v => ({ ...v, ...options })),
      mapLeft(NotAuthorizedError.from)
    );

    return result;
  },
});
