import { StoryMutations, StoryPolicy } from 'core-domain';
import { andThen, map, resolve, pipe } from 'core-domain/lib';
import { MutationResolvers } from '../../../../generated/resolvers-types';
import { handleError } from '../../../../shared/helpers/handle-error';
import { resolverReturnType } from '../../../../shared/helpers/result-helpers';
import { validateArguments } from '../../../../shared/helpers/validation-helper';
import { createStoryArgsValidationSchema } from './create-story-validation';

export const createStory: Required<MutationResolvers>['createStory'] = async (
  parent,
  args,
  context,
  info
) => {
  const result = await pipe(
    {
      parent,
      args,
      context,
      info,
      user: context.currentUser,
      requesterId: args.input.requesterId,
      projectId: args.input.projectId,
    },
    StoryPolicy(context.db).authorizeUpdatingOrRequesting,
    andThen(validateArguments(createStoryArgsValidationSchema)),
    andThen(({ context, member, user, args }) =>
      pipe(
        StoryMutations.build({
          id: args.input.id,
          title: args.input.title,
          description: args.input.description,
          kind: args.input.kind,
          points: args.input.points ?? null,
          releaseDate: args.input.releaseDate ?? null,
          completedAt: args.input.completedAt ?? null,
          state: args.input.state,
          requester: user,
          member,
          position: args.input.position,
          priority: args.input.priority,
        }),
        andThen(context.db.story.create)
      )
    ),
    map(
      resolverReturnType('CreateStorySuccessResult', result => ({
        result,
      }))
    ),
    handleError,
    resolve
  );

  return result;
};
