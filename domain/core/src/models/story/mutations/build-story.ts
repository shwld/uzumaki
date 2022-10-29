import { InvalidAttributesError } from '../../../lib/error';
import type {
  StoryKind,
  StoryPosition,
  StoryState,
  Story_Attributes,
} from '../story-interfaces';
import { StoryValidator } from '../story-validator';
import { pipe, Result, map } from '../../../lib/result';
import { BuiltState, ID, STATE_IS_BUILT } from '../../../lib/interfaces';
import { ProjectMemberRole } from '../../project-member/project-member-interfaces';

/**
 * Interfaces
 */
export interface Story_BuildInput {
  id: ID;
  title: string;
  description: string;
  state: StoryState;
  kind: StoryKind;
  points: number | null;
  releaseDate: Date | null;
  completedAt: Date | null;

  position: StoryPosition;
  priority: number;
  requesterId: string;
  projectId: string;
}

export interface Story_BuiltAttributes extends Story_Attributes, BuiltState {}

/**
 * Mutation
 */
export const build = (
  input: Story_BuildInput
): Result<InvalidAttributesError, Story_BuiltAttributes> => {
  return pipe(
    {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    StoryValidator.validate,
    map(v => ({
      ...v,
      __state: STATE_IS_BUILT,
    }))
  );
};