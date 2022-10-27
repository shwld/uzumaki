import { Story_Attributes } from './story-interfaces';

// moveTo(position: StoryPosition, priority: number): StoryEntity {
//   switch (position) {
//     case 'ICEBOX':
//     case 'BACKLOG': {
//       if (!this.isPlanning()) return this;
//       break;
//     }
//     case 'CURRENT': {
//       if (!this.isProcessing() && !this.isPlanning()) return this;
//       break;
//     }
//     case 'DONE': {
//       if (!this.isCompleted()) return this;
//       break;
//     }
//   }
//   return new StoryEntity({
//     ...this.attributes(),
//     position,
//     priority,
//     isMoved: true,
//   });
// }

// updateState(state: StoryState): StoryEntity {
//   if (state === this.state) return this;

//   return new StoryEntity({
//     ...this.attributes(),
//     state,
//     completedAt:
//       this.completedAt ?? state === 'ACCEPTED' ? new Date() : undefined,
//     isUpdated: true,
//   });
// }

export type StoryEntity = Story_Attributes & {
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
  };
}
