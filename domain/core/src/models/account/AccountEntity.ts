import { GenericEntityProperties, StateProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { UserEntity } from '../user';
import { accountValidator } from './accountValidator';

/** Field  */
export interface UpdatableAccountEntityFields {
  name: string;
}

interface AccountEntityRelationFields {
  // TODO: prismaのrelationにする
  createdBy?: UserEntity;
}

export type AccountEntityFields = GenericEntityProperties &
  StateProperties &
  UpdatableAccountEntityFields &
  AccountEntityRelationFields;

type AttributesForInitialize = GenericEntityProperties &
  Partial<StateProperties> &
  UpdatableAccountEntityFields &
  AccountEntityRelationFields;

export class AccountEntity implements AccountEntityFields {
  readonly id;
  readonly createdAt;
  readonly updatedAt;

  readonly isDeleted;
  readonly isUpdated;

  readonly name;

  readonly createdBy?: UserEntity | undefined;

  attributes(): AttributesForInitialize {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      name: this.name,
    };
  }

  constructor(args: AttributesForInitialize) {
    this.id = genericValidator.id.parse(args.id);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);

    this.isDeleted = args.isDeleted ?? false;
    this.isUpdated = args.isUpdated ?? false;

    this.name = accountValidator.name.parse(args.name);

    this.createdBy = args.createdBy;
  }

  update(fields: UpdatableAccountEntityFields) {
    return new AccountEntity({
      ...this.attributes(),
      ...fields,
      isUpdated: true,
    });
  }

  destroy() {
    return new AccountEntity({
      ...this.attributes(),
      isDeleted: true,
    });
  }
}
