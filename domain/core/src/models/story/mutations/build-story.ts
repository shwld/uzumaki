import { InvalidAttributesError } from '../../../shared/error';
import type {
  StoryKind,
  StoryPosition,
  StoryState,
  Story_Attributes,
} from '../story-interfaces';
import { StoryValidator } from '../story-validator';
import { pipe, Result, map } from '../../../shared/result';
import { BuiltState, ID, STATE_IS_BUILT } from '../../../shared/interfaces';
import { UserEntity } from '../../user';
import { ProjectMemberEntity } from '../../project-member';

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

  member: ProjectMemberEntity;
}

export interface Story_BuiltAttributes extends Story_Attributes, BuiltState {}

/**
 * Mutation
 */
export const build = ({
  member,
  ...input
}: Story_BuildInput): Result<InvalidAttributesError, Story_BuiltAttributes> => {
  return pipe(
    {
      ...input,
      requesterId: member.id,
      projectId: member.projectId,
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
