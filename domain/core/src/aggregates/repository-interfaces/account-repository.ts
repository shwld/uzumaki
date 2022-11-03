import { Result } from '../../shared/result';
import { AccountMembership_ValidAttributes, UserEntity } from '../../models';
import type {
  Account_BuiltAttributes,
  Account_DraftAttributes,
  Account_RemoveAttributes,
  Account_ValidAttributes,
} from '../../models/account';
import { RepositoryRuntimeError } from '../../shared/error';
import type { NodesWrapper, Repository } from './base';

export interface AccountRepository
  extends Repository<Account_ValidAttributes, { user?: UserEntity | null }> {
  create(
    attributes: Account_BuiltAttributes
  ): Result<RepositoryRuntimeError, Account_ValidAttributes>;
  update(
    attributes: Account_DraftAttributes
  ): Result<RepositoryRuntimeError, Account_ValidAttributes>;
  destroy(
    attributes: Account_RemoveAttributes
  ): Result<RepositoryRuntimeError, Account_ValidAttributes>;
  findMembership: (input: {
    account?: Account_ValidAttributes | null;
    user?: UserEntity | null;
  }) => Result<RepositoryRuntimeError, AccountMembership_ValidAttributes>;
  findMemberships: (
    account: Account_ValidAttributes
  ) => Result<
    RepositoryRuntimeError,
    NodesWrapper<AccountMembership_ValidAttributes>
  >;
}
