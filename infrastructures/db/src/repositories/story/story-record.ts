import type { Story, StoryOrderPriority } from '@prisma/client';
import { StoryEntity } from 'core-domain';

export const convertToEntity = (
  record: Story & { storyOrderPriority: StoryOrderPriority | null }
): StoryEntity => {
  const { storyOrderPriority, ...story } = record;
  return StoryEntity({
    ...story,
    priority: storyOrderPriority?.priority ?? 1,
    position: storyOrderPriority?.position ?? 'ICEBOX',
  });
};
