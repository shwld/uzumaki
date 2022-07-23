import {
  StoryEntity,
  StoryPosition,
  UpdatableStoryEntityFields,
  ProjectUserEntity,
} from '../../models';
import { generateTimeStampProperties } from '../../shared/entity';

export const buildStory = (
  storyParams: UpdatableStoryEntityFields & {
    id: string;
    position: StoryPosition;
    priority: number;
    requester: ProjectUserEntity;
  }
): StoryEntity => {
  const { requester, ...params } = storyParams;
  return new StoryEntity({
    ...generateTimeStampProperties(),
    ...params,
    projectId: requester.projectId,
    requesterId: requester.userId,
  });
};
