import { GenericEntityProperties, StateProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { projectValidator } from './projectValidator';

type ProjectPrivacy = 'PRIVATE' | 'PUBLIC';

/** Field  */
export interface UpdatableProjectEntityFields {
  name: string;
  description: string;
  privacy: ProjectPrivacy;
  currentVelocity: number;
}

interface ProjectEntityRelationFields {
  accountId: string;
  createdById?: string;
}

export type ProjectEntityFields = GenericEntityProperties &
  StateProperties &
  UpdatableProjectEntityFields &
  ProjectEntityRelationFields;

type AttributesForInitialize = GenericEntityProperties &
  Partial<StateProperties> &
  UpdatableProjectEntityFields &
  ProjectEntityRelationFields;

export class ProjectEntity implements ProjectEntityFields {
  readonly id;
  readonly createdAt;
  readonly updatedAt;
  readonly isDeleted;
  readonly isUpdated;

  readonly name;
  readonly description;
  readonly privacy;
  readonly currentVelocity;

  readonly accountId;
  readonly createdById;

  attributes(): AttributesForInitialize & StateProperties {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isUpdated: this.isUpdated,
      isDeleted: this.isDeleted,
      name: this.name,
      description: this.description,
      privacy: this.privacy,
      currentVelocity: this.currentVelocity,
      accountId: this.accountId,
      createdById: this.createdById,
    };
  }

  constructor(args: AttributesForInitialize) {
    this.id = genericValidator.id.parse(args.id);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);
    this.isDeleted = args.isDeleted ?? false;
    this.isUpdated = args.isUpdated ?? false;

    this.name = projectValidator.name.parse(args.name);
    this.description = projectValidator.description.parse(args.description);
    this.privacy = projectValidator.privacy.parse(
      args.privacy
    ) as ProjectPrivacy;
    this.currentVelocity = projectValidator.currentVelocity.parse(
      args.currentVelocity
    );

    this.accountId = projectValidator.accountId.parse(args.accountId);
    this.createdById = projectValidator.createdById.parse(args.createdById);
  }

  destroy() {
    return new ProjectEntity({
      ...this.attributes(),
      isDeleted: true,
    });
  }
}
