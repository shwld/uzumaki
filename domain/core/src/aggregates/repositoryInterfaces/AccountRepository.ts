import { Result } from '../../shared/functional';
import { AccountMembershipEntity, UserEntity } from '../../models';
import type {
  Account_BuiltAttributes,
  Account_DraftAttributes,
  Account_RemoveAttributes,
  Account_ValidAttributes,
} from '../../models/account';
import {
  InvalidAttributesError,
  RepositoryRuntimeError,
} from '../../shared/error';
import type { NodesWrapper, Repository } from './base';

export interface AccountRepository
  extends Repository<Account_ValidAttributes, { user: UserEntity }> {
  create(
    attributes: Account_BuiltAttributes
  ): Result<RepositoryRuntimeError, Account_ValidAttributes>;
  update(
    attributes: Account_DraftAttributes
  ): Result<RepositoryRuntimeError, Account_ValidAttributes>;
  delete(
    attributes: Account_RemoveAttributes
  ): Result<RepositoryRuntimeError, Account_ValidAttributes>;
  // membership: (
  //   account: Account_Attributes,
  //   user: UserEntity
  // ) => Promise<AccountMembershipEntity | undefined>;
  // memberships: (
  //   account: Account_Attributes
  // ) => Promise<NodesWrapper<AccountMembershipEntity>>;
}
