import type { BaseAttributes, ValidState } from '../../lib/interfaces';

export type StoryState =
  | 'UNSTARTED'
  | 'STARTED'
  | 'FINISHED'
  | 'DELIVERED'
  | 'REJECTED'
  | 'ACCEPTED';
export type StoryKind = 'FEATURE' | 'BUG' | 'CHORE' | 'RELEASE';
export type StoryPosition = 'DONE' | 'CURRENT' | 'BACKLOG' | 'ICEBOX';

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
