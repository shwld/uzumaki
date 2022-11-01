import type {
  Project_ValidAttributes,
  StoryPosition,
  Story_BuiltAttributes,
  Story_DraftAttributes,
  Story_RemoveAttributes,
  Story_ValidAttributes,
} from '../../models';
import { Story_MovingAttributes } from '../../models/story/mutations/move-story';
import { RepositoryRuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface StoryRepository
  extends Repository<
    Story_ValidAttributes,
    {
      project?: Project_ValidAttributes;
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
  }) => Result<RepositoryRuntimeError, Story_ValidAttributes | null>;
  findByEmail: (args: {
    email: string;
  }) => Result<RepositoryRuntimeError, Story_ValidAttributes | null>;
  create(
    attributes: Story_BuiltAttributes
  ): Result<RepositoryRuntimeError, Story_ValidAttributes>;
  update(
    attributes: Story_DraftAttributes
  ): Result<RepositoryRuntimeError, Story_ValidAttributes>;
  destroy(
    attributes: Story_RemoveAttributes
  ): Result<RepositoryRuntimeError, Story_ValidAttributes>;
  move: (
    attributes: Story_MovingAttributes
  ) => Result<RepositoryRuntimeError, Story_ValidAttributes>;
}
