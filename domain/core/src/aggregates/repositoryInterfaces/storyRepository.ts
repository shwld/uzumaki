import type { StoryEntity } from '../../models';
import { Repository } from './base';

export interface StoryRepository
  extends Repository<StoryEntity, undefined> {}
