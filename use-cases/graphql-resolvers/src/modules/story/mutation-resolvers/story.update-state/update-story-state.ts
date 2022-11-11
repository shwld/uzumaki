import { StoryMutations, StoryPolicy } from 'core-domain';
import { andThen, map, resolve, pipe, tap } from 'core-domain';
import { MutationResolvers } from '../../../../generated/resolvers-types';
import { handleError } from '../../../../shared/helpers/handle-error';
import { resolverReturnType } from '../../../../shared/helpers/result-helpers';
import { validateArguments } from '../../../../shared/helpers/validation-helper';
import { updateStoryStateArgsValidationSchema } from './update-story-state-validation';

export const updateStoryState: Required<MutationResolvers>['updateStoryState'] =
  async (parent, args, context, info) => {
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
      })),
      andThen(StoryPolicy(context.db).authorizeUpdating),
      andThen(validateArguments(updateStoryStateArgsValidationSchema)),
      andThen(({ context, story, user, args }) =>
        pipe(
          story,
          StoryMutations.editState({
            state: args.input.state,
          }),
          andThen(context.db.story.updateState),
          tap(story =>
            context.pubsub.story.publish({
              object: story,
              triggeredBy: user,
            })
          ),
          tap(story =>
            context.background.calculateVelocity.enqueue({
              projectId: story.projectId,
            })
          )
        )
      ),
      map(
        resolverReturnType('UpdateStoryStateSuccessResult', result => ({
          result,
        }))
      ),
      handleError,
      resolve
    );

    return result;
  };
