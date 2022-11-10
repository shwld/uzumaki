import { andThen, map, mapLeft } from '../../shared/result';
import { NotAuthorizedError, RuntimeError } from '../../shared/error';
import { pipe, Result } from '../../shared/result';
import { ID, RequiredNonNull } from '../../shared/interfaces';
import { UserEntity } from '../user';
import { StoryEntity } from '.';
import {
  Aggregates,
  NodesWrapper,
} from '../../aggregates/repository-interfaces';
import { requireObjectArgument } from '../../shared';
import { ProjectMemberEntity } from '../project-member';
import { StoryFindManyOptions } from '../../aggregates/repository-interfaces/story-repository';

export const StoryPolicy = (db: Aggregates) => ({
  applyScope(
    user: UserEntity | null,
    options?: Omit<StoryFindManyOptions, 'user'>
  ): Result<RuntimeError, NodesWrapper<StoryEntity>> {
    return db.story.findMany({ user, ...options });
  },
  authorizeUpdating: authorizeUpdating(db),
  authorizeUpdatingOrRequesting: <
    T extends {
      user: UserEntity | null;
      requesterId?: ID | null;
      projectId: ID;
    }
  >({
    user,
    requesterId,
    projectId,
    ...options
  }: T): Result<
    NotAuthorizedError,
    Omit<T, 'user' | 'requesterId' | 'projectId'> &
      RequiredNonNull<{ user: UserEntity; member: ProjectMemberEntity }> &
      (
        | { requester: null | undefined; requesterMember: null }
        | RequiredNonNull<{
            requester: ProjectMemberEntity;
            requesterUser: UserEntity;
          }>
      )
  > => {
    const result = pipe(
      { user, projectId },
      requireObjectArgument,
      andThen(authorizeUpdating(db)),
      map(it => ({
        projectId,
        requesterId,
        ...it,
        ...options,
      })),
      andThen(authorizeRequesting(db)),
      mapLeft(NotAuthorizedError.from)
    );

    return result;
  },
});

/**
 * PRIVATE
 */

const authorizeUpdating =
  (db: Aggregates) =>
  <
    T extends {
      user: UserEntity | null;
      projectId: ID;
    }
  >({
    user,
    projectId,
    ...options
  }: T): Result<
    NotAuthorizedError,
    Omit<T, 'user' | 'projectId'> &
      RequiredNonNull<{ user: UserEntity; member: ProjectMemberEntity }>
  > => {
    const result = pipe(
      { user, projectId },
      requireObjectArgument,
      andThen(input =>
        pipe(
          { userId: input.user.id, projectId: input.projectId },
          db.projectMember.find,
          map(member => ({
            member,
            user: input.user,
          }))
        )
      ),
      map(v => ({ ...v, ...options })),
      mapLeft(NotAuthorizedError.from)
    );

    return result;
  };

const authorizeRequesting =
  (db: Aggregates) =>
  <
    T extends {
      requesterId?: ID | null;
      projectId: ID;
    }
  >(
    args: T
  ): Result<
    NotAuthorizedError,
    Omit<T, 'requesterId' | 'projectId'> &
      (
        | { requester: null; requesterMember: null }
        | RequiredNonNull<{
            requester: ProjectMemberEntity;
            requesterUser: UserEntity;
          }>
      )
  > => {
    const { projectId, requesterId, ...options } = args;
    if (requesterId == null) {
      return Result.right({
        requester: null,
        requesterMember: null,
        ...options,
      });
    }

    const result2 = pipe(
      { id: requesterId },
      db.user.find,
      map(user => ({
        user,
        projectId,
        ...options,
      })),
      andThen(input =>
        pipe(
          { userId: input.user.id, projectId: input.projectId },
          db.projectMember.find,
          map(requester => ({
            requester,
            requesterUser: input.user,
          }))
        )
      ),
      map(v => ({ ...v, ...options })),
      mapLeft(NotAuthorizedError.from)
    );

    return result2;
  };
