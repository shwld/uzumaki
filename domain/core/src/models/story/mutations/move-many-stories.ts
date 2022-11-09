import { RuntimeError } from '../../../shared/error';
import { pipe, Result, Either, tryCatch } from '../../../shared/result';
import { ID, filterOfPresence, filter } from '../../../shared';
import { Story_MovingAttributes } from './move-story';
import { StoryMutations, Story_MoveInput } from '.';
import { StoryEntity } from '../story-entity';

/**
 * Interfaces
 */
export type Stories_MoveInput = Array<
  {
    id: ID;
  } & Story_MoveInput
>;

/**
 * Mutation
 */
export const moveMany =
  (input: Stories_MoveInput) =>
  (stories: StoryEntity[]): Result<RuntimeError, Story_MovingAttributes[]> => {
    const storiesWithDestination = pipe(
      input.map(destination => {
        const story = stories.find(it => it.id === destination.id);
        if (story == null) return null;

        return { story, destination };
      }),
      filterOfPresence
    );

    const movedStoriesPromises = storiesWithDestination.map(
      ({ story, destination }) =>
        pipe(
          story,
          StoryMutations.move({
            position: destination.position,
            priority: destination.priority,
          }),
          it => it()
        )
    );

    const movedStories = Promise.all(movedStoriesPromises).then(stories => {
      return filter(Either.isRight)(stories).map(it => it.right);
    });

    const result = tryCatch(
      () => movedStories,
      e => new RuntimeError(JSON.stringify(e))
    );

    return result;
  };

/**
 * Private Methods
 */
