import { Result, StoryMutations, StoryPolicy } from 'core-domain';
import { andThen, map, resolve, pipe, tap } from 'core-domain';
import { MutationResolvers } from '../../../../generated/resolvers-types';
import { handleError } from '../../../../shared/helpers/handle-error';
import { resolverReturnType } from '../../../../shared/helpers/result-helpers';
import { validateArguments } from '../../../../shared/helpers/validation-helper';
import { updateStoryArgsValidationSchema } from './update-story-validation';

export const updateStory: Required<MutationResolvers>['updateStory'] = async (
  parent,
  args,
  context,
  info
) => {
  const result = await pipe(
    context.db.story.find({ id: args.input.id }),
    map(story => ({
      parent,
      args,
      context,
      info,
      user: context.currentUser,
      story,
      projectId: story.projectId,
      requesterId: args.input.requesterId,
    })),
    andThen(StoryPolicy(context.db).authorizeUpdatingOrRequesting),
    andThen(validateArguments(updateStoryArgsValidationSchema)),
    andThen(({ context, story, requester, user, args }) =>
      pipe(
        story,
        StoryMutations.edit({
          title: args.input.title,
          description: args.input.description,
          kind: args.input.kind,
          points: args.input.points,
          releaseDate: args.input.releaseDate,
          requester,
        }),
        andThen(context.db.story.update),
        andThen(updatedStory => {
          const oldStory = story;
          if (oldStory.state !== args.input.state) {
            return pipe(
              updatedStory,
              StoryMutations.editState({
                state: args.input.state,
              }),
              andThen(context.db.story.updateState)
            );
          } else {
            return Result.right({
              story: updatedStory,
              effectedStories: [],
            });
          }
        }),
        tap(({ story }) =>
          context.pubsub.story.publish({
            object: story,
            triggeredBy: user,
          })
        ),
        tap(({ story }) =>
          context.background.calculateVelocity.enqueue({
            projectId: story.projectId,
          })
        )
      )
    ),
    map(
      resolverReturnType('UpdateStorySuccessResult', result => ({
        result: result.story,
        effectedStories: result.effectedStories,
      }))
    ),
    handleError,
    resolve
  );

  return result;
};
