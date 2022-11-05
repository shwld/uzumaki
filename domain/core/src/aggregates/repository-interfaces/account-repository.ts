import { Result } from '../../shared/result';
import { AccountMembershipEntity, UserEntity } from '../../models';
import type {
  Account_BuiltAttributes,
  Account_DraftAttributes,
  Account_RemoveAttributes,
  AccountEntity,
} from '../../models/account';
import { RecordNotFoundError, RuntimeError } from '../../shared/error';
import type { NodesWrapper, Repository } from './base';

export interface AccountRepository
  extends Repository<AccountEntity, { user?: UserEntity | null }> {
  create(
    attributes: Account_BuiltAttributes
  ): Result<RuntimeError, AccountEntity>;
  update(
    attributes: Account_DraftAttributes
  ): Result<RuntimeError, AccountEntity>;
  destroy(
    attributes: Account_RemoveAttributes
  ): Result<RuntimeError, AccountEntity>;
  findMembership: (input: {
    account: AccountEntity;
    user: UserEntity;
  }) => Result<RecordNotFoundError | RuntimeError, AccountMembershipEntity>;
  findMemberships: (
    account: AccountEntity
  ) => Result<RuntimeError, NodesWrapper<AccountMembershipEntity>>;
}
