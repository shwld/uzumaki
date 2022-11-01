import { InvalidAttributesError } from '../../../shared/error';
import type {
  StoryKind,
  StoryPosition,
  Story_Attributes,
} from '../story-interfaces';
import { StoryValidator } from '../story-validator';
import { pipe, Result, map } from '../../../shared/result';
import { DraftState, ID, STATE_IS_DRAFT } from '../../../shared/interfaces';

/**
 * Interfaces
 */
export interface Story_EditInput {
  title?: string;
  description?: string;
  kind?: StoryKind;
  points?: number | null;
  releaseDate?: Date | null;
  completedAt?: Date | null;

  position?: StoryPosition;
  priority?: number;
  requesterId?: string;
  projectId?: string;
}

export interface Story_DraftAttributes extends Story_Attributes, DraftState {}

/**
 * Mutation
 */
export const edit =
  (input: Story_EditInput) =>
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
      map(v => ({ ...v, __state: STATE_IS_DRAFT }))
    );
  };
