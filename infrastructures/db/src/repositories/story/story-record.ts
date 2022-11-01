import type { Story, StoryOrderPriority } from '@prisma/client';
import type { Story_ValidAttributes } from 'core-domain';

export const convertToValidAttributes = (
  record: Story & { storyOrderPriority: StoryOrderPriority | null }
): Story_ValidAttributes => {
  const { storyOrderPriority, ...story } = record;
  return {
    ...story,
    priority: storyOrderPriority?.priority ?? 1,
    position: storyOrderPriority?.position ?? 'ICEBOX',
    __state: 'Validated',
  };
};
