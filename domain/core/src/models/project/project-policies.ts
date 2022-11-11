import { andThen, map, mapLeft } from '../../shared/result';
import { NotAuthorizedError, RuntimeError } from '../../shared/error';
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
import { ProjectMemberEntity } from '../project-member';

export const ProjectPolicy = (db: Aggregates) => ({
  applyScope(
    user: UserEntity | null
  ): Result<RuntimeError, NodesWrapper<ProjectEntity>> {
    return db.project.findMany({ user: user });
  },
  authorize: authorize(db, member => member != null),
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
  authorizeUpdating: authorize(db, member => member.canEditProject()),
});

const authorize =
  (db: Aggregates, permit: (member: ProjectMemberEntity) => boolean) =>
  <
    T extends {
      user: UserEntity | null;
      project: ProjectEntity | null;
    }
  >({
    user,
    project,
    ...options
  }: T): Result<
    NotAuthorizedError,
    Omit<T, 'user' | 'project'> &
      RequiredNonNull<{
        user: UserEntity;
        project: ProjectEntity;
        member: ProjectMemberEntity;
      }>
  > => {
    return pipe(
      { user, project },
      requireObjectArgument,
      andThen(args => {
        return pipe(
          db.projectMember.find({
            userId: args.user.id,
            projectId: args.project.id,
          }),
          map(project => ({
            project,
            args,
          }))
        );
      }),
      map(it => ({
        member: ProjectMemberEntity(it.project),
        project: it.args.project,
        user: it.args.user,
      })),
      andThen(({ member, user, project }) =>
        permit(member)
          ? Result.right({ user, project, member, ...options })
          : Result.left(new NotAuthorizedError('Not Authorized'))
      ),
      mapLeft(NotAuthorizedError.from)
    );
  };
