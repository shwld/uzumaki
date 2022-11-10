import { InvalidAttributesError } from '../../../shared/error';
import type {
  StoryKind,
  StoryPosition,
  Story_Attributes,
} from '../story-interfaces';
import { StoryValidator } from '../story-validator';
import { pipe, Result, map, compact } from '../../../shared';
import { DraftState, STATE_IS_DRAFT } from '../../../shared/interfaces';
import { ProjectMemberEntity } from '../../project-member';

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

  requester?: ProjectMemberEntity | null;
}

export interface Story_DraftAttributes extends Story_Attributes, DraftState {}

/**
 * Mutation
 */
export const edit =
  ({ requester, ...input }: Story_EditInput) =>
  (
    item: Story_Attributes
  ): Result<InvalidAttributesError, Story_DraftAttributes> => {
    const newRecord: Story_Attributes = {
      ...item,
      ...compact(input),
      ...(requester != null ? { requesterId: requester.id } : {}),
    };
    return pipe(
      newRecord,
      StoryValidator.validate,
      map(v => ({ ...v, __state: STATE_IS_DRAFT }))
    );
  };
