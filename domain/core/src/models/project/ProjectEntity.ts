import { produce, immerable } from 'immer';
import { GenericEntityProperties } from '../../shared/entity';
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
}

export type ProjectEntityFields = GenericEntityProperties &
  UpdatableProjectEntityFields &
  ProjectEntityRelationFields;

export class ProjectEntity implements ProjectEntityFields {
  [immerable] = true;

  readonly id;
  readonly createdAt;
  readonly updatedAt;
  readonly isDeleted;

  readonly name;
  readonly description;
  readonly privacy;
  readonly currentVelocity;

  readonly accountId;

  constructor(
    args: Omit<GenericEntityProperties, 'isDeleted'> &
      UpdatableProjectEntityFields &
      ProjectEntityRelationFields
  ) {
    this.id = genericValidator.id.parse(args.id);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);
    this.isDeleted = false;

    this.name = projectValidator.name.parse(args.name);
    this.description = projectValidator.description.parse(args.description);
    this.privacy = projectValidator.privacy.parse(
      args.privacy
    ) as ProjectPrivacy;
    this.currentVelocity = projectValidator.currentVelocity.parse(
      args.currentVelocity
    );

    this.accountId = projectValidator.accountId.parse(args.accountId);
  }

  destroy() {
    return produce(this, (draft) => {
      draft.isDeleted = true;
    });
  }
}
