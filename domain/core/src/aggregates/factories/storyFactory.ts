import {
  StoryEntity,
  StoryPosition,
  UpdatableStoryEntityFields,
  ProjectMemberEntity,
} from '../../models';
import { generateTimeStampProperties } from '../../shared/entity';

export const buildStory = (
  storyParams: UpdatableStoryEntityFields & {
    id: string;
    position: StoryPosition;
    priority: number;
    requester: ProjectMemberEntity;
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
