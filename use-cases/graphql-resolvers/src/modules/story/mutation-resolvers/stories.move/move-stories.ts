import { StoryMutations, StoryPolicy } from 'core-domain';
import { andThen, map, resolve, pipe } from 'core-domain/lib';
import { MutationResolvers } from '../../../../generated/resolvers-types';
import { handleError } from '../../../../shared/helpers/handle-error';
import { resolverReturnType } from '../../../../shared/helpers/result-helpers';
import { validateArguments } from '../../../../shared/helpers/validation-helper';
import { moveStoriesArgsValidationSchema } from './move-stories-validation';

export const moveStories: Required<MutationResolvers>['moveStories'] = async (
  parent,
  args,
  context,
  info
) => {
  const result = pipe(
    {
      parent,
      args,
      context,
      info,
      user: context.currentUser,
      projectId: args.input.projectId,
    },
    StoryPolicy(context.db).authorizeUpdating,
    andThen(validateArguments(moveStoriesArgsValidationSchema)),
    andThen(({ context, user, args }) => {
      return pipe(
        StoryPolicy(context.db).applyScope(user, {
          ids: args.input.stories.map(it => it.id),
        }),
        andThen(stories =>
          pipe(
            stories.nodes,
            StoryMutations.moveMany(args.input.stories),
            andThen(context.db.story.moveMany)
          )
        )
      );
    }),
    map(
      resolverReturnType('MoveStoriesSuccessResult', result => ({
        result,
      }))
    ),
    handleError,
    resolve
  );

  return result;
};
