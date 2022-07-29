import {
  StoryEntity,
  StoryPosition,
  UpdatableStoryEntityFields,
  ProjectMemberEntity,
  ProjectEntity,
} from '../../models';
import { generateTimeStampProperties } from '../../shared/entity';

export const buildStory = (
  project: ProjectEntity,
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
    projectId: project.id,
    requesterId: requester.id,
  });
};
