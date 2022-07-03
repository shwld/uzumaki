import { AccountMembershipEntity, UserEntity } from '../../models';
import type { AccountEntity } from '../../models/account/entity';
import { NodesWrapper, Repository } from './base';

export interface AccountRepository
  extends Omit<Repository<AccountEntity, { user: UserEntity }>, 'create'> {
  create: (item: AccountEntity, owner: UserEntity) => Promise<AccountEntity>;
  membership: (
    account: AccountEntity,
    user: UserEntity
  ) => Promise<AccountMembershipEntity | undefined>;
  memberships: (
    account: AccountEntity
  ) => Promise<NodesWrapper<AccountMembershipEntity>>;
}
