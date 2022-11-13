import { InvalidAttributesError } from '../../../shared/error';
import {
  StoryPosition,
  StoryState,
  Story_Attributes,
} from '../story-interfaces';
import { StoryValidator } from '../story-validator';
import {
  patternMatch,
  pipe,
  Result,
  map,
  andThen,
  toResult,
  Either,
  P,
} from '../../../shared';
import { STATE_IS_STATE_EDITING } from '../story-entity';

/**
 * Interfaces
 */
export interface Story_EditStateInput {
  state?: StoryState;
}

export type STATE_IS_STATE_EDITING = 'StateEditing';

export interface Story_DraftStateAttributes
  extends Omit<Story_Attributes, 'priority'> {
  __state: typeof STATE_IS_STATE_EDITING;
  priority: number | 'NEWEST_BACKLOG';
}

/**
 * Mutation
 */
export const editState =
  (input: Story_EditStateInput) =>
  (
    item: Story_Attributes
  ): Result<InvalidAttributesError, Story_DraftStateAttributes> => {
    const newRecord: Story_Attributes = {
      ...item,
      ...input,
    };
    return pipe(
      newRecord,
      moveByState(item),
      andThen(StoryValidator.validate),
      map(v => ({
        ...v,
        priority: v.state === 'UNSTARTED' ? 'NEWEST_BACKLOG' : v.priority,
        __state: STATE_IS_STATE_EDITING,
      }))
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
    if (oldStory.state === story.state)
      return toResult(
        Either.left(
          InvalidAttributesError.customError([{ message: 'Not moved' }])
        )
      );

    const res = patternMatch(story)
      .with({ state: P.when(state => state === oldStory.state) }, () =>
        Either.left(
          InvalidAttributesError.customError([{ message: 'Not changed' }])
        )
      )
      .with({ state: 'STARTED' }, it =>
        Either.right({
          ...it,
          position: StoryPosition.CURRENT,
          priority: 0,
        })
      )
      .with({ state: 'ACCEPTED' }, it =>
        Either.right({
          ...it,
          position: StoryPosition.DONE,
          priority: 0,
        })
      )
      .with({ state: 'UNSTARTED' }, it =>
        Either.right({
          ...it,
          position: StoryPosition.BACKLOG,
        })
      )
      .otherwise(Either.right);

    return toResult(res);
  };
