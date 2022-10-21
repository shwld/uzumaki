import { Fp } from '../..';
import { AccountMembershipEntity, UserEntity } from '../../models';
import type {
  Account_BuildValidInput,
  Account_EditValidInput,
  Account_RemoveValidInput,
  Account_Attributes,
} from '../../models/account/account-interfaces';
import { InvalidAttributesError } from '../../shared/error';
import type { NodesWrapper, Repository, RepositoryErrorMessage } from './base';

export interface AccountRepository
  extends Repository<Account_Attributes, { user: UserEntity }> {
  create(
    attributes: Fp.TE.TaskEither<
      InvalidAttributesError,
      Account_BuildValidInput
    >
  ): Fp.TE.TaskEither<RepositoryErrorMessage, Account_Attributes>;
  update(
    attributes: Account_EditValidInput
  ): Fp.TE.TaskEither<RepositoryErrorMessage, Account_Attributes>;
  delete(
    attributes: Account_RemoveValidInput
  ): Fp.TE.TaskEither<RepositoryErrorMessage, Account_Attributes>;
  // membership: (
  //   account: Account_Attributes,
  //   user: UserEntity
  // ) => Promise<AccountMembershipEntity | undefined>;
  // memberships: (
  //   account: Account_Attributes
  // ) => Promise<NodesWrapper<AccountMembershipEntity>>;
}
