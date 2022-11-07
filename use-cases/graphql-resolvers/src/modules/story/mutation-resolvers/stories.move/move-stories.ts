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
import {
  MoveStoriesSuccessResult,
  MutationResolvers,
} from '../../../../generated/resolvers-types';
import { handleError } from '../../../../shared/helpers/handle-error';
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
    StoryPolicy(context.db).authorizeBulkMoving,
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
    map(result => ({
      __typename: 'MoveStoriesSuccessResult' as const,
      result,
    })),
    handleError,
    resolve
  );

  return result;
};
