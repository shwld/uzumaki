import type { ProjectEntity, StoryEntity, UserEntity } from '../../models';
import { Repository } from './base';

export interface StoryRepository
  extends Repository<StoryEntity, { project: ProjectEntity }> {}
