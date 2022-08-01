import type { ProjectEntity, StoryEntity, StoryPosition } from '../../models';
import { Repository } from './base';

export interface StoryRepository
  extends Repository<
    StoryEntity,
    {
      project?: ProjectEntity;
      ids?: string[];
      position?: StoryPosition[];
      orderBy?: { priority?: 'asc' | 'desc'; position?: 'asc' | 'desc' };
    }
  > {
  incrementPriority: (args: {
    projectId: string;
    position: StoryPosition;
    priority?: {
      gt?: number;
      gte?: number;
    };
  }) => Promise<StoryEntity[]>;
  findMaxPriority: (args: {
    projectId: string;
    position: StoryPosition;
  }) => Promise<StoryEntity | undefined>;
}
