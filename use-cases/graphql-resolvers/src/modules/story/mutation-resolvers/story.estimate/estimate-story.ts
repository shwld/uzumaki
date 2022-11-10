import { StoryMutations, StoryPolicy } from 'core-domain';
import { andThen, map, resolve, pipe } from 'core-domain/lib';
import { MutationResolvers } from '../../../../generated/resolvers-types';
import { handleError } from '../../../../shared/helpers/handle-error';
import { resolverReturnType } from '../../../../shared/helpers/result-helpers';
import { validateArguments } from '../../../../shared/helpers/validation-helper';
import { estimateStoryArgsValidationSchema } from './story-validation';

export const estimateStory: Required<MutationResolvers>['estimateStory'] =
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
      andThen(validateArguments(estimateStoryArgsValidationSchema)),
      andThen(({ context, story, args }) =>
        pipe(
          story,
          StoryMutations.edit(args.input),
          andThen(context.db.story.update)
        )
      ),
      map(
        resolverReturnType('EstimateStorySuccessResult', result => ({
          result,
        }))
      ),
      handleError,
      resolve
    );

    return result;
  };
