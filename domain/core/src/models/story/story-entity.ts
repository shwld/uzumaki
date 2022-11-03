import { EntityState } from '../../shared';
import { Story_Attributes } from './story-interfaces';

export const STATE_IS_STATE_EDITING = 'StateEditing' as const;
export const STATE_IS_MOVING = 'Moving' as const;

export type StoryEntity = Story_Attributes &
  EntityState & {
    isUnEstimated(): boolean;
    isCompleted(): boolean;
    isProcessing(): boolean;
    isPlanning(): boolean;
    canEstimate(): boolean;
  };

export function StoryEntity(item: Story_Attributes): StoryEntity {
  return {
    ...item,
    isUnEstimated(): boolean {
      return item.points != null;
    },
    isCompleted(): boolean {
      return item.state === 'ACCEPTED';
    },
    isProcessing(): boolean {
      return (
        item.state === 'STARTED' ||
        item.state === 'FINISHED' ||
        item.state === 'DELIVERED' ||
        item.state === 'REJECTED'
      );
    },
    isPlanning(): boolean {
      return item.state === 'UNSTARTED';
    },
    canEstimate(): boolean {
      return item.kind === 'FEATURE';
    },
    __state: 'Entity',
  };
}
