import { GenericEntityProperties, StateProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { projectUserValidator } from './projectUserValidator';

type ProjectUserRole = 'OWNER' | 'MEMBER' | 'VIEWER';

/** Field  */
export interface UpdatableProjectUserEntityFields {
  role: ProjectUserRole;
}

interface ProjectUserEntityRelationFields {
  projectId: string;
  userId: string;
  name: string;
}

export type ProjectUserEntityFields = Omit<GenericEntityProperties, 'id'> &
  StateProperties &
  UpdatableProjectUserEntityFields &
  ProjectUserEntityRelationFields;

export type AttributesForInitialize = Omit<GenericEntityProperties, 'id'> &
  Partial<StateProperties> &
  UpdatableProjectUserEntityFields &
  ProjectUserEntityRelationFields;

export class ProjectUserEntity implements ProjectUserEntityFields {
  readonly createdAt;
  readonly updatedAt;
  readonly isDeleted;
  readonly isUpdated;

  readonly projectId;
  readonly userId;

  readonly role;
  readonly name;

  attributes(): AttributesForInitialize {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      projectId: this.projectId,
      userId: this.userId,
      role: this.role,
      name: this.name,
    };
  }

  constructor(args: AttributesForInitialize) {
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);
    this.isDeleted = args.isDeleted ?? false;
    this.isUpdated = args.isUpdated ?? false;

    this.projectId = projectUserValidator.projectId.parse(args.projectId);
    this.userId = projectUserValidator.userId.parse(args.userId);

    this.role = projectUserValidator.role.parse(args.role) as ProjectUserRole;
    this.name = projectUserValidator.name.parse(args.name);
  }

  destroy() {
    return new ProjectUserEntity({
      ...this.attributes(),
      isDeleted: true,
    });
  }
}
