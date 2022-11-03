import type {
  ProjectEntity,
  StoryPosition,
  Story_BuiltAttributes,
  Story_DraftAttributes,
  Story_DraftStateAttributes,
  Story_RemoveAttributes,
  StoryEntity,
} from '../../models';
import { Story_MovingAttributes } from '../../models/story/mutations/move-story';
import { RepositoryRuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface StoryRepository
  extends Repository<
    StoryEntity,
    {
      project?: ProjectEntity;
      ids?: string[];
      position?: StoryPosition;
      orderBy?: {
        priority?: 'asc' | 'desc';
        position?: 'asc' | 'desc';
        completedAt?: 'asc' | 'desc';
      };
    }
  > {
  findByUid: (args: {
    uid: string;
  }) => Result<RepositoryRuntimeError, StoryEntity | null>;
  findByEmail: (args: {
    email: string;
  }) => Result<RepositoryRuntimeError, StoryEntity | null>;
  create(
    attributes: Story_BuiltAttributes
  ): Result<RepositoryRuntimeError, StoryEntity>;
  update(
    attributes: Story_DraftAttributes
  ): Result<RepositoryRuntimeError, StoryEntity>;
  updateState(
    attributes: Story_DraftStateAttributes
  ): Result<RepositoryRuntimeError, StoryEntity>;
  destroy(
    attributes: Story_RemoveAttributes
  ): Result<RepositoryRuntimeError, StoryEntity>;
  move: (
    attributes: Story_MovingAttributes
  ) => Result<RepositoryRuntimeError, StoryEntity>;
}
