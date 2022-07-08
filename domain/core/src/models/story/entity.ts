import { produce, immerable } from 'immer';
import { GenericEntityProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { storyValidator } from './validator';

type StoryState =
  | 'UNSTARTED'
  | 'STARTED'
  | 'FINISHED'
  | 'DELIVERED'
  | 'REJECTED'
  | 'ACCEPTED';
type StoryKind = 'FEATURE' | 'BUG' | 'CHORE' | 'RELEASE';
export type StoryPosition = 'DONE' | 'CURRENT' | 'BACKLOG' | 'ICEBOX';

/** Field  */
export interface UpdatableStoryEntityFields {
  title: string;
  description: string;
  state: StoryState;
  kind: StoryKind;
  points?: number;
  releaseDate?: Date;
}

interface StoryEntityRelationFields {
  position: StoryPosition;
  priority: number;
  requesterId?: string;
  projectId: string;
}

export type StoryEntityFields = GenericEntityProperties &
  UpdatableStoryEntityFields &
  StoryEntityRelationFields;

export class StoryEntity implements StoryEntityFields {
  [immerable] = true;

  readonly id;
  readonly createdAt;
  readonly updatedAt;

  readonly title;
  readonly description;
  readonly state;
  readonly kind;
  readonly points;
  readonly releaseDate;

  readonly position;
  readonly priority;

  readonly requesterId;
  readonly projectId;

  constructor(
    args: GenericEntityProperties &
      UpdatableStoryEntityFields &
      StoryEntityRelationFields
  ) {
    this.id = genericValidator.id.parse(args.id);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);

    this.title = storyValidator.title.parse(args.title);
    this.description = storyValidator.description.parse(args.description);
    this.state = storyValidator.state.parse(args.state) as StoryState;
    this.kind = storyValidator.kind.parse(args.kind) as StoryKind;
    this.points = storyValidator.points.parse(args.points);
    this.releaseDate = storyValidator.releaseDate.parse(args.releaseDate);

    this.position = storyValidator.position.parse(
      args.position
    ) as StoryPosition;
    this.priority = storyValidator.priority.parse(args.priority);

    this.requesterId = storyValidator.requesterId.parse(args.requesterId);
    this.projectId = storyValidator.projectId.parse(args.projectId);
  }
}
