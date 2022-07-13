import {
  ProjectEntity,
  StoryEntity,
  StoryPosition,
  UpdatableStoryEntityFields,
  UserEntity,
} from '../../models';
import { generateTimeStampProperties } from '../../shared/entity';

export const buildStory = (
  storyParams: UpdatableStoryEntityFields & {
    id: string;
    position: StoryPosition;
    priority: number;
    requester?: UserEntity;
    project: ProjectEntity;
  }
): StoryEntity => {
  const { requester, project, ...params } = storyParams;
  return new StoryEntity({
    ...generateTimeStampProperties(),
    ...params,
    projectId: project.id,
    requesterId: requester?.id,
  });
};
