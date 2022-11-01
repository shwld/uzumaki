import type { BaseAttributes, ValidState } from '../../shared/interfaces';

export const StoryState = {
  UNSTARTED: 'UNSTARTED',
  STARTED: 'STARTED',
  FINISHED: 'FINISHED',
  DELIVERED: 'DELIVERED',
  REJECTED: 'REJECTED',
  ACCEPTED: 'ACCEPTED',
} as const;
export type StoryState = typeof StoryState[keyof typeof StoryState];

export const StoryKind = {
  FEATURE: 'FEATURE',
  BUG: 'BUG',
  CHORE: 'CHORE',
  RELEASE: 'RELEASE',
} as const;
export type StoryKind = typeof StoryKind[keyof typeof StoryKind];

export const StoryPosition = {
  DONE: 'DONE',
  CURRENT: 'CURRENT',
  BACKLOG: 'BACKLOG',
  ICEBOX: 'ICEBOX',
} as const;
export type StoryPosition = typeof StoryPosition[keyof typeof StoryPosition];

export interface Story_Attributes extends BaseAttributes {
  title: string;
  description: string;
  state: StoryState;
  kind: StoryKind;
  points: number | null;
  releaseDate: Date | null;
  completedAt: Date | null;

  position: StoryPosition;
  priority: number;
  requesterId: string;
  projectId: string;
}

export interface Story_ValidAttributes extends Story_Attributes, ValidState {}
