import { Result } from '../../lib/result';
import { AccountMembership_ValidAttributes, UserEntity } from '../../models';
import type {
  Account_BuiltAttributes,
  Account_DraftAttributes,
  Account_RemoveAttributes,
  Account_ValidAttributes,
} from '../../models/account';
import { RepositoryRuntimeError } from '../../lib/error';
import type { NodesWrapper, Repository } from './base';

export interface AccountRepository
  extends Repository<Account_ValidAttributes, { user: UserEntity }> {
  create(
    attributes: Account_BuiltAttributes
  ): Result<RepositoryRuntimeError, Account_ValidAttributes>;
  update(
    attributes: Account_DraftAttributes
  ): Result<RepositoryRuntimeError, Account_ValidAttributes>;
  destroy(
    attributes: Account_RemoveAttributes
  ): Result<RepositoryRuntimeError, Account_ValidAttributes>;
  membership: (
    account: Account_ValidAttributes,
    user: UserEntity
  ) => Result<RepositoryRuntimeError, AccountMembership_ValidAttributes | null>;
  memberships: (
    account: Account_ValidAttributes
  ) => Result<
    RepositoryRuntimeError,
    NodesWrapper<AccountMembership_ValidAttributes>
  >;
}
