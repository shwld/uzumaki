import { AccountMembershipEntity, UserEntity } from '../../models';
import type {
  Account_BuiltAttributes,
  Account_DraftAttributes,
  Account_RemovingAttributes,
  Account_ValidAttributes,
} from '../../models/account/account-interfaces';
import { NodesWrapper, Repository } from './base';

export interface AccountRepository
  extends Repository<Account_ValidAttributes, { user: UserEntity }> {
  create(
    builtAttributes: Account_BuiltAttributes
  ): Promise<Account_ValidAttributes>;
  update(
    draftAttributes: Account_DraftAttributes
  ): Promise<Account_ValidAttributes>;
  delete(
    removingAttributes: Account_RemovingAttributes
  ): Promise<Account_ValidAttributes>;
  // membership: (
  //   account: Account_ValidAttributes,
  //   user: UserEntity
  // ) => Promise<AccountMembershipEntity | undefined>;
  // memberships: (
  //   account: Account_ValidAttributes
  // ) => Promise<NodesWrapper<AccountMembershipEntity>>;
}
