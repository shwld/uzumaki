import { immerable } from 'immer';
import { TimeStampProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { accountMembershipValidator } from './accountValidator';

type AccountMembershipRole = 'OWNER' | 'MEMBER' | 'VIEWER';

/** Field  */
export interface UpdatableAccountMembershipEntityFields {
  role: AccountMembershipRole;
}

interface AccountMembershipEntityRelationFields {
  userId: string;
  accountId: string;
}

export type AccountMembershipEntityFields = TimeStampProperties &
  UpdatableAccountMembershipEntityFields &
  AccountMembershipEntityRelationFields;

export class AccountMembershipEntity implements AccountMembershipEntityFields {
  [immerable] = true;

  readonly userId;
  readonly accountId;
  readonly createdAt;
  readonly updatedAt;

  readonly role;

  constructor(
    args: TimeStampProperties &
      UpdatableAccountMembershipEntityFields &
      AccountMembershipEntityRelationFields
  ) {
    this.userId = accountMembershipValidator.userId.parse(args.userId);
    this.accountId = accountMembershipValidator.accountId.parse(args.accountId);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);

    this.role = accountMembershipValidator.role.parse(
      args.role
    ) as AccountMembershipRole;
  }

  canAccountEdit(): boolean {
    return this.role === 'OWNER';
  }
}
