import { Result } from '../../shared/functional';
import { AccountMembershipEntity, UserEntity } from '../../models';
import type {
  Account_BuildValidInput,
  Account_EditValidInput,
  Account_RemoveValidInput,
  Account_Attributes,
} from '../../models/account/account-interfaces';
import {
  InvalidAttributesError,
  RepositoryRuntimeError,
} from '../../shared/error';
import type { NodesWrapper, Repository } from './base';

export interface AccountRepository
  extends Repository<Account_Attributes, { user: UserEntity }> {
  create(
    attributes: Account_BuildValidInput
  ): Result<RepositoryRuntimeError, Account_Attributes>;
  update(
    attributes: Account_EditValidInput
  ): Result<RepositoryRuntimeError, Account_Attributes>;
  delete(
    attributes: Account_RemoveValidInput
  ): Result<RepositoryRuntimeError, Account_Attributes>;
  // membership: (
  //   account: Account_Attributes,
  //   user: UserEntity
  // ) => Promise<AccountMembershipEntity | undefined>;
  // memberships: (
  //   account: Account_Attributes
  // ) => Promise<NodesWrapper<AccountMembershipEntity>>;
}
