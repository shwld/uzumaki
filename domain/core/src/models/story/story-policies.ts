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
  authorizeCreating: authorizeCreating(db),
  authorizeBulkMoving: authorizeCreating(db),
});

/**
 * PRIVATE
 */

const authorizeCreating =
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
