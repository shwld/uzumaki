import { Result } from '../../shared/result';
import { AccountMembershipEntity, UserEntity } from '../../models';
import type {
  Account_BuiltAttributes,
  Account_DraftAttributes,
  Account_RemoveAttributes,
  AccountEntity,
} from '../../models/account';
import {
  RecordNotFoundError,
  RepositoryRuntimeError,
} from '../../shared/error';
import type { NodesWrapper, Repository } from './base';

export interface AccountRepository
  extends Repository<AccountEntity, { user?: UserEntity | null }> {
  create(
    attributes: Account_BuiltAttributes
  ): Result<RepositoryRuntimeError, AccountEntity>;
  update(
    attributes: Account_DraftAttributes
  ): Result<RepositoryRuntimeError, AccountEntity>;
  destroy(
    attributes: Account_RemoveAttributes
  ): Result<RepositoryRuntimeError, AccountEntity>;
  findMembership: (input: {
    account: AccountEntity;
    user: UserEntity;
  }) => Result<
    RecordNotFoundError | RepositoryRuntimeError,
    AccountMembershipEntity
  >;
  findMemberships: (
    account: AccountEntity
  ) => Result<RepositoryRuntimeError, NodesWrapper<AccountMembershipEntity>>;
}
