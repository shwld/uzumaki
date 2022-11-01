import { InvalidAttributesError } from '../../../shared/error';
import {
  StoryPosition,
  StoryState,
  Story_Attributes,
} from '../story-interfaces';
import { StoryValidator } from '../story-validator';
import {
  andThen,
  pipe,
  Result,
  map,
  Either,
  toResult,
} from '../../../shared/result';
import { patternMatch, P, STATE_IS_DRAFT } from '../../../shared';
import { Story_DraftAttributes } from './edit-story';

/**
 * Interfaces
 */
export interface Story_MoveInput {
  position?: StoryPosition;
  priority?: number;
}

/**
 * Mutation
 */
export const move =
  (input: Story_MoveInput) =>
  (
    item: Story_Attributes
  ): Result<InvalidAttributesError, Story_DraftAttributes> => {
    const newRecord: Story_Attributes = {
      ...item,
      ...input,
    };
    return pipe(
      newRecord,
      StoryValidator.validate,
      andThen(moveByState(item)),
      map(v => ({ ...v, __state: STATE_IS_DRAFT }))
    );
  };

/**
 * Private Methods
 */
const moveByState =
  (oldStory: Story_Attributes) =>
  (
    story: Story_Attributes
  ): Result<InvalidAttributesError, Story_Attributes> => {
    if (oldStory.position === story.position)
      return toResult(Either.right(story));

    const result = patternMatch(story)
      .with(
        { position: 'DONE', state: P.when(state => state !== 'ACCEPTED') },
        it =>
          Either.left(
            InvalidAttributesError.customError([
              {
                message: `Illegal state: ${it.position} is only ${StoryState.ACCEPTED}`,
              },
            ])
          )
      )
      .with(
        {
          position: P.when(
            position => position === 'BACKLOG' || position === 'ICEBOX'
          ),
          state: P.when(state => state !== 'UNSTARTED'),
        },
        it =>
          Either.left(
            InvalidAttributesError.customError([
              {
                message: `Illegal state: ${it.position} is only ${StoryState.UNSTARTED}`,
              },
            ])
          )
      )
      .otherwise(Either.right);

    return toResult(result);
  };
