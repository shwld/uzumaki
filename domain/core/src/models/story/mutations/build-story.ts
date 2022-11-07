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
import { ProjectMemberRole } from '../../project-member/project-member-interfaces';
import { UserEntity } from '../../user';
import { ProjectEntity } from '../../project';

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
  requester: UserEntity | null;
  project: ProjectEntity;
}

export interface Story_BuiltAttributes extends Story_Attributes, BuiltState {}

/**
 * Mutation
 */
export const build = ({
  requester,
  project,
  ...input
}: Story_BuildInput): Result<InvalidAttributesError, Story_BuiltAttributes> => {
  return pipe(
    {
      ...input,
      requesterId: requester?.id ?? null,
      projectId: project.id,
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
