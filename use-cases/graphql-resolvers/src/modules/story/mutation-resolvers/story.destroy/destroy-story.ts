import { StoryMutations, StoryPolicy } from 'core-domain';
import { andThen, map, resolve, pipe } from 'core-domain/lib';
import { MutationResolvers } from '../../../../generated/resolvers-types';
import { handleError } from '../../../../shared/helpers/handle-error';
import { resolverReturnType } from '../../../../shared/helpers/result-helpers';
import { validateArguments } from '../../../../shared/helpers/validation-helper';
import { destroyStoryArgsValidationSchema } from './destroy-story-validation';

export const destroyStory: Required<MutationResolvers>['destroyStory'] = async (
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
    })),
    andThen(StoryPolicy(context.db).authorizeUpdating),
    andThen(validateArguments(destroyStoryArgsValidationSchema)),
    andThen(({ context, story, user, args }) =>
      pipe(story, StoryMutations.remove, context.db.story.destroy)
    ),
    map(
      resolverReturnType('DestroyStorySuccessResult', result => ({
        result,
      }))
    ),
    handleError,
    resolve
  );

  return result;
};
