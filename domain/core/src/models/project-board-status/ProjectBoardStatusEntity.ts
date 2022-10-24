import { GenericEntityProperties, StateProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { projectBoardStatusValidator } from './projectBoardStatusValidator';

/** Field  */
export interface UpdatableProjectBoardStatusEntityFields {
  velocity: number;
}

interface ProjectBoardStatusEntityRelationFields {}

export type ProjectBoardStatusEntityFields = GenericEntityProperties &
  StateProperties &
  UpdatableProjectBoardStatusEntityFields &
  ProjectBoardStatusEntityRelationFields;

type AttributesForInitialize = GenericEntityProperties &
  Partial<StateProperties> &
  UpdatableProjectBoardStatusEntityFields &
  ProjectBoardStatusEntityRelationFields;

export class ProjectBoardStatusEntity
  implements ProjectBoardStatusEntityFields
{
  readonly id;
  readonly createdAt;
  readonly updatedAt;
  readonly isDeleted;
  readonly isUpdated;

  readonly velocity;

  attributes(): AttributesForInitialize & StateProperties {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isUpdated: this.isUpdated,
      isDeleted: this.isDeleted,

      velocity: this.velocity,
    };
  }

  constructor(args: AttributesForInitialize) {
    this.id = genericValidator.id.parse(args.id);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);
    this.isDeleted = args.isDeleted ?? false;
    this.isUpdated = args.isUpdated ?? false;

    this.velocity = projectBoardStatusValidator.velocity.parse(args.velocity);
  }

  update(
    fields: UpdatableProjectBoardStatusEntityFields
  ): ProjectBoardStatusEntity {
    return new ProjectBoardStatusEntity({
      ...this.attributes(),
      ...fields,
      isUpdated: true,
    });
  }

  destroy() {
    return new ProjectBoardStatusEntity({
      ...this.attributes(),
      isDeleted: true,
    });
  }
}
