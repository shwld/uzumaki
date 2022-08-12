import { GenericEntityProperties, StateProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { ProjectMemberEntity } from '../projectMember';
import { storyValidator } from './storyValidator';

export type StoryState =
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
  completedAt?: Date;
}

interface StoryEntityRelationFields {
  position: StoryPosition;
  priority: number;
  requesterId: string;
  projectId: string;
}

interface StoryEntityStateFields {
  isMoved: boolean;
}

export type StoryEntityFields = GenericEntityProperties &
  StateProperties &
  StoryEntityStateFields &
  UpdatableStoryEntityFields &
  StoryEntityRelationFields;

type AttributesForInitialize = GenericEntityProperties &
  UpdatableStoryEntityFields &
  StoryEntityRelationFields &
  Partial<StateProperties & StoryEntityStateFields>;

export class StoryEntity implements StoryEntityFields {
  readonly id;
  readonly createdAt;
  readonly updatedAt;

  readonly isDeleted;
  readonly isUpdated;
  readonly isMoved;

  readonly title;
  readonly description;
  readonly state;
  readonly kind;
  readonly points;
  readonly releaseDate;
  readonly completedAt;

  readonly position;
  readonly priority;

  readonly requesterId;
  readonly projectId;

  attributes(): AttributesForInitialize &
    StateProperties &
    StoryEntityStateFields {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      state: this.state,
      title: this.title,
      description: this.description,
      kind: this.kind,
      points: this.points,
      releaseDate: this.releaseDate,
      completedAt: this.completedAt,
      position: this.position,
      priority: this.priority,
      requesterId: this.requesterId,
      projectId: this.projectId,
      isUpdated: this.isUpdated,
      isDeleted: this.isDeleted,
      isMoved: this.isMoved,
    };
  }

  constructor(args: AttributesForInitialize) {
    this.id = genericValidator.id.parse(args.id);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);

    this.isDeleted = args.isDeleted ?? false;
    this.isUpdated = args.isUpdated ?? false;
    this.isMoved = args.isMoved ?? false;

    this.title = storyValidator.title.parse(args.title);
    this.description = storyValidator.description.parse(args.description);
    this.state = storyValidator.state.parse(args.state) as StoryState;
    this.kind = storyValidator.kind.parse(args.kind) as StoryKind;
    this.points = storyValidator.points.parse(args.points);
    this.releaseDate = storyValidator.releaseDate.parse(args.releaseDate);
    this.completedAt = storyValidator.completedAt.parse(args.completedAt);

    this.position = storyValidator.position.parse(
      args.position
    ) as StoryPosition;
    this.priority = storyValidator.priority.parse(args.priority);

    this.requesterId = storyValidator.requesterId.parse(args.requesterId);
    this.projectId = storyValidator.projectId.parse(args.projectId);
  }

  update({
    requester,
    ...fields
  }: Omit<UpdatableStoryEntityFields, 'state'> & {
    requester: ProjectMemberEntity;
  }): StoryEntity {
    return new StoryEntity({
      ...this.attributes(),
      ...fields,
      requesterId: requester.id,
      isUpdated: true,
    });
  }

  estimate(points: number | undefined) {
    if (points === this.points) return this;

    return new StoryEntity({
      ...this.attributes(),
      points,
      isUpdated: true,
    });
  }

  destroy(): StoryEntity {
    return new StoryEntity({
      ...this.attributes(),
      isDeleted: true,
    });
  }

  moveTo(position: StoryPosition, priority: number): StoryEntity {
    switch (position) {
      case 'ICEBOX':
      case 'BACKLOG': {
        if (!this.isPlanning()) return this;
        break;
      }
      case 'CURRENT': {
        if (!this.isProcessing() && !this.isPlanning()) return this;
        break;
      }
      case 'DONE': {
        if (!this.isCompleted()) return this;
        break;
      }
    }
    return new StoryEntity({
      ...this.attributes(),
      position,
      priority,
      isMoved: true,
    });
  }

  updateState(state: StoryState): StoryEntity {
    if (state === this.state) return this;

    return new StoryEntity({
      ...this.attributes(),
      state,
      completedAt:
        this.completedAt ?? state === 'ACCEPTED' ? new Date() : undefined,
      isUpdated: true,
    });
  }

  isUnEstimated(): boolean {
    return this.points != null;
  }

  isCompleted(): boolean {
    return this.state === 'ACCEPTED';
  }

  isProcessing(): boolean {
    return (
      this.state === 'STARTED' ||
      this.state === 'FINISHED' ||
      this.state === 'DELIVERED' ||
      this.state === 'REJECTED'
    );
  }

  isPlanning(): boolean {
    return this.state === 'UNSTARTED';
  }
}

/**
 * PRIVATE
 */
