import { produce, immerable } from 'immer';
import { GenericEntityProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { UserEntity } from '../user';
import { storyValidator } from './storyValidator';

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
  readonly isDeleted;

  readonly isUpdated: boolean = false;
  readonly isMoved: boolean = false;

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
    args: Omit<GenericEntityProperties, 'isDeleted'> &
      UpdatableStoryEntityFields &
      StoryEntityRelationFields
  ) {
    this.id = genericValidator.id.parse(args.id);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);
    this.isDeleted = false;

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

  update(
    fields: UpdatableStoryEntityFields & { requester?: UserEntity }
  ): StoryEntity {
    return produce(this, (draft) => {
      draft.title = storyValidator.title.parse(fields.title);
      draft.description = storyValidator.description.parse(fields.description);
      draft.state = storyValidator.state.parse(fields.state);
      draft.kind = storyValidator.kind.parse(fields.kind);
      draft.points = storyValidator.points.parse(fields.points);
      draft.releaseDate = storyValidator.releaseDate.parse(fields.releaseDate);
      draft.requesterId = storyValidator.requesterId.parse(
        fields.requester?.id
      );
      draft.isUpdated = true;
    });
  }

  estimate(points: number | undefined) {
    return produce(this, (draft) => {
      draft.points = storyValidator.points.parse(points);
      draft.isUpdated = true;
    });
  }

  destroy(): StoryEntity {
    return produce(this, (draft) => {
      draft.isDeleted = true;
    });
  }

  moveTo(position: StoryPosition, priority: number): StoryEntity {
    return produce(this, (draft) => {
      draft.position = position;
      draft.priority = priority;
      draft.isMoved = true;
    });
  }

  isUnEstimated(): boolean {
    return this.points != null;
  }
}
