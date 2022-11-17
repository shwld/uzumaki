import type {
  StoryKind,
  StoryPosition,
  StoryState,
  Story_Attributes,
} from '../story-interfaces';
import { StoryValidator } from '../story-validator';
import {
  pipe,
  Result,
  map,
  InvalidAttributesError,
  BuiltState,
  ID,
  STATE_IS_BUILT,
} from '../../../shared';
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
  state,
  position,
  priority,
  ...input
}: Story_BuildInput): Result<InvalidAttributesError, Story_BuiltAttributes> => {
  return pipe(
    {
      ...input,
      ...getStatePositionPriority(state, position, priority),
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

/**
 * PRIVATE
 */
const getStatePositionPriority = (
  state: StoryState,
  position: StoryPosition,
  priority: number
): { position: StoryPosition; state: StoryState; priority: number } => {
  if (state === 'ACCEPTED')
    return {
      state,
      position: 'DONE',
      priority: 0,
    };

  switch (position) {
    case 'CURRENT':
    case 'DONE': {
      if (state === 'UNSTARTED') {
        return {
          state,
          position: 'BACKLOG',
          priority,
        };
      } else {
        return {
          state,
          position: 'CURRENT',
          priority: 0,
        };
      }
    }
    default: {
      if (state !== 'UNSTARTED') {
        return {
          state,
          position: 'CURRENT',
          priority: 0,
        };
      } else {
        return {
          state,
          position,
          priority,
        };
      }
    }
  }
};
