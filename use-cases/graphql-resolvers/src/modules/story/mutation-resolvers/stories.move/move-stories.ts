import { StoryMutations, StoryPolicy } from 'core-domain';
import {
  andThen,
  map,
  flatten,
  resolve,
  pipe,
  filterOfPresence,
  sequenceResults,
} from 'core-domain/lib';
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
  const result = await pipe(
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
        map(stories => {
          const a = args.input.stories.map(destination => {
            const story = stories.nodes.find(it => it.id === destination.id);
            if (story == null) return null;

            const movedStory = pipe(
              story,
              StoryMutations.move({
                position: destination.position,
                priority: destination.priority,
              }),
              andThen(context.db.story.move)
            );
            return movedStory;
          });
          return a;
        }),
        map(filterOfPresence),
        map(sequenceResults)
      );
    }),
    flatten,
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
