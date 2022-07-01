import { immerable } from 'immer';
import { TimeStampProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { accountUserValidator } from './validator';

/** Field  */
export interface UpdatableAccountUserEntityFields {}

interface AccountUserEntityRelationFields {
  userId: string;
  accountId: string;
}

export type AccountUserEntityFields = TimeStampProperties &
  UpdatableAccountUserEntityFields &
  AccountUserEntityRelationFields;

export class AccountUserEntity implements AccountUserEntityFields {
  [immerable] = true;

  readonly userId;
  readonly accountId;
  readonly createdAt;
  readonly updatedAt;

  constructor(
    args: TimeStampProperties &
      UpdatableAccountUserEntityFields &
      AccountUserEntityRelationFields
  ) {
    this.userId = accountUserValidator.userId.parse(args.userId);
    this.accountId = accountUserValidator.accountId.parse(args.accountId);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);
  }
}
