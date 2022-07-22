import { GenericEntityProperties, StateProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { projectUserValidator } from './projectUserValidator';

type ProjectUserRole = 'OWNER' | 'MEMBER' | 'VIEWER';

/** Field  */
export interface UpdatableProjectUserEntityFields {
  role: ProjectUserRole;
  name: string;
}

interface ProjectUserEntityRelationFields {}

export type ProjectUserEntityFields = GenericEntityProperties &
  StateProperties &
  UpdatableProjectUserEntityFields &
  ProjectUserEntityRelationFields;

export type AttributesForInitialize = GenericEntityProperties &
  Partial<StateProperties> &
  UpdatableProjectUserEntityFields &
  ProjectUserEntityRelationFields;

export class ProjectUserEntity implements ProjectUserEntityFields {
  readonly id;
  readonly createdAt;
  readonly updatedAt;
  readonly isDeleted;
  readonly isUpdated;

  readonly role;
  readonly name;

  attributes(): AttributesForInitialize {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      role: this.role,
      name: this.name,
    };
  }

  constructor(args: AttributesForInitialize) {
    this.id = genericValidator.id.parse(args.id);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);
    this.isDeleted = args.isDeleted ?? false;
    this.isUpdated = args.isUpdated ?? false;

    this.role = projectUserValidator.role.parse(args.role) as ProjectUserRole;
    this.name = projectUserValidator.name.parse(args.name);
  }

  update(fields: UpdatableProjectUserEntityFields): ProjectUserEntity {
    return new ProjectUserEntity({
      ...this.attributes(),
      ...fields,
      isUpdated: true,
    });
  }

  destroy() {
    return new ProjectUserEntity({
      ...this.attributes(),
      isDeleted: true,
    });
  }
}
