import { ProjectBoard_StoryFragment } from '../ProjectBoard.generated';

export const nextPriority = (stories: ProjectBoard_StoryFragment[]): number => {
  if (stories.length === 0) return 0;
  return stories[0].priority + 1;
};
