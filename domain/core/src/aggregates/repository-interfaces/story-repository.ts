import type {
  ProjectEntity,
  StoryPosition,
  Story_BuiltAttributes,
  Story_DraftAttributes,
  Story_DraftStateAttributes,
  Story_RemoveAttributes,
  StoryEntity,
  UserEntity,
} from '../../models';
import { Story_MovingAttributes } from '../../models/story/mutations/move-story';
import { RuntimeError, Result } from '../../shared';
import { Repository } from './base';

export type StoryFindManyOptions = {
  project?: ProjectEntity;
  user?: UserEntity | null;
  ids?: string[];
  position?: StoryPosition;
  orderBy?: {
    priority?: 'asc' | 'desc';
    position?: 'asc' | 'desc';
    completedAt?: 'asc' | 'desc';
  };
};

export interface StoryRepository
  extends Repository<StoryEntity, StoryFindManyOptions> {
  findByUid: (args: {
    uid: string;
  }) => Result<RuntimeError, StoryEntity | null>;
  findByEmail: (args: {
    email: string;
  }) => Result<RuntimeError, StoryEntity | null>;
  create(attributes: Story_BuiltAttributes): Result<RuntimeError, StoryEntity>;
  update(attributes: Story_DraftAttributes): Result<RuntimeError, StoryEntity>;
  updateState(
    attributes: Story_DraftStateAttributes
  ): Result<RuntimeError, StoryEntity>;
  destroy(
    attributes: Story_RemoveAttributes
  ): Result<RuntimeError, StoryEntity>;
  move: (
    attributes: Story_MovingAttributes
  ) => Result<RuntimeError, StoryEntity>;
  moveMany: (
    attributes: Story_MovingAttributes[]
  ) => Result<RuntimeError, StoryEntity[]>;
}
