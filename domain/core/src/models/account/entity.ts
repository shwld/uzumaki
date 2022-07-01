import { immerable } from 'immer';
import { GenericEntityProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { accountValidator } from './validator';

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

  readonly name;

  constructor(
    args: GenericEntityProperties &
      UpdatableAccountEntityFields &
      AccountEntityRelationFields
  ) {
    this.id = genericValidator.id.parse(args.id);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);

    this.name = accountValidator.name.parse(args.name);
  }
}
