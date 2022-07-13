import produce, { immerable } from 'immer';
import { GenericEntityProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { UserEntity } from '../user';
import { accountValidator } from './accountValidator';

/** Field  */
export interface UpdatableAccountEntityFields {
  name: string;
}

interface AccountEntityRelationFields {}

export type AccountEntityFields = GenericEntityProperties &
  UpdatableAccountEntityFields &
  AccountEntityRelationFields;

export class AccountEntity implements AccountEntityFields {
  [immerable] = true;

  readonly id;
  readonly createdAt;
  readonly updatedAt;
  readonly isDeleted;

  readonly name;

  constructor(
    args: Omit<GenericEntityProperties, 'isDeleted'> &
      UpdatableAccountEntityFields &
      AccountEntityRelationFields
  ) {
    this.id = genericValidator.id.parse(args.id);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);
    this.isDeleted = false;

    this.name = accountValidator.name.parse(args.name);
  }

  update(fields: UpdatableAccountEntityFields) {
    return produce(this, (draft) => {
      draft.name = accountValidator.name.parse(fields.name);
    });
  }

  destroy() {
    return produce(this, (draft) => {
      draft.isDeleted = true;
    });
  }

  readonly createdBy?: UserEntity;
  setCreatedBy(user: UserEntity) {
    return produce(this, (draft) => {
      draft.createdBy = user;
    });
  }
}
