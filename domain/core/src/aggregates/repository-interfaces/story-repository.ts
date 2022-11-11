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
import { RuntimeError, Result, ID } from '../../shared';
import { NodesWrapper, PaginationArguments, Repository } from './base';

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
}
