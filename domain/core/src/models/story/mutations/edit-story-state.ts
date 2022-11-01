import { InvalidAttributesError } from '../../../shared/error';
import {
  StoryPosition,
  StoryState,
  Story_Attributes,
} from '../story-interfaces';
import { StoryValidator } from '../story-validator';
import { pipe, Result, map } from '../../../shared/result';
import { STATE_IS_STATE_EDITING } from '../story-entity';
import { patternMatch } from '../../../shared';

/**
 * Interfaces
 */
export interface Story_EditStateInput {
  state?: StoryState;
}

export type STATE_IS_STATE_EDITING = 'StateEditing';

export interface Story_DraftStateAttributes extends Story_Attributes {
  __state: typeof STATE_IS_STATE_EDITING;
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
      StoryValidator.validate,
      map(v => ({ ...v, __state: STATE_IS_STATE_EDITING }))
    );
  };

/**
 * Private Methods
 */
const moveByState =
  (oldStory: Story_Attributes) =>
  (story: Story_Attributes): Story_Attributes => {
    if (oldStory.state === story.state) return story;

    return patternMatch(story)
      .with({ state: 'STARTED' }, it => ({
        ...it,
        position: StoryPosition.CURRENT,
        priority: 0,
      }))
      .with({ state: 'ACCEPTED' }, it => ({
        ...it,
        position: StoryPosition.DONE,
        priority: 0,
      }))
      .otherwise(it => it);
  };
