import type { ProjectEntity, StoryEntity } from '../../models';
import { Repository } from './base';

export interface StoryRepository
  extends Repository<StoryEntity, { project: ProjectEntity }> {}
