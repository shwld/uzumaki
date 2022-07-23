import { GenericEntityProperties, StateProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { ProjectUserEntity } from '../projectUser';
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

  readonly position;
  readonly priority;

  readonly requesterId;
  readonly projectId;

  attributes(): AttributesForInitialize {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      title: this.title,
      description: this.description,
      state: this.state,
      kind: this.kind,
      points: this.points,
      releaseDate: this.releaseDate,
      position: this.position,
      priority: this.priority,
      requesterId: this.requesterId,
      projectId: this.projectId,
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
  }: UpdatableStoryEntityFields & {
    requester: ProjectUserEntity;
  }): StoryEntity {
    return new StoryEntity({
      ...this.attributes(),
      ...fields,
      requesterId: requester.userId,
      isUpdated: true,
    });
  }

  estimate(points: number | undefined) {
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
    return new StoryEntity({
      ...this.attributes(),
      position,
      priority,
      isMoved: true,
    });
  }

  updateState(state: StoryState): StoryEntity {
    return new StoryEntity({
      ...this.attributes(),
      state,
      isUpdated: true,
    });
  }

  isUnEstimated(): boolean {
    return this.points != null;
  }
}

/**
 * PRIVATE
 */
