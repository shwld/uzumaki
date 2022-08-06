import { GenericEntityProperties, StateProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { ProjectBoardConfigEntity } from '../projectBoardConfig';
import { ProjectBoardStatusEntity } from '../projectBoardStatus';
import { projectValidator } from './projectValidator';

type ProjectPrivacy = 'PRIVATE' | 'PUBLIC';

/** Field  */
export interface UpdatableProjectEntityFields {
  name: string;
  description: string;
  privacy: ProjectPrivacy;
}

interface ProjectEntityRelationFields {
  accountId: string;
  createdById?: string;
  boardConfig: ProjectBoardConfigEntity;
  boardConfigId: string;
  boardStatus: ProjectBoardStatusEntity;
  boardStatusId: string;
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

  readonly accountId;
  readonly createdById;

  readonly boardConfig;
  readonly boardConfigId;
  readonly boardStatus;
  readonly boardStatusId;

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
      accountId: this.accountId,
      createdById: this.createdById,
      boardConfig: this.boardConfig,
      boardConfigId: this.boardConfigId,
      boardStatus: this.boardStatus,
      boardStatusId: this.boardStatusId,
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

    this.accountId = projectValidator.accountId.parse(args.accountId);
    this.createdById = projectValidator.createdById.parse(args.createdById);

    this.boardConfig = args.boardConfig;
    this.boardConfigId = projectValidator.boardConfigId.parse(
      args.boardConfigId
    );
    this.boardStatus = args.boardStatus;
    this.boardStatusId = projectValidator.boardStatusId.parse(
      args.boardStatusId
    );
  }

  destroy() {
    return new ProjectEntity({
      ...this.attributes(),
      isDeleted: true,
    });
  }
}
