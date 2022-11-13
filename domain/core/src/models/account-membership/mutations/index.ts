import { build } from './build-account-membership';
import { edit } from './edit-account-membership';
import { remove } from './remove-account-membership';
export type {
  AccountMembership_BuildInput,
  AccountMembership_BuiltAttributes,
} from './build-account-membership';
export type {
  AccountMembership_EditInput,
  AccountMembership_DraftAttributes,
} from './edit-account-membership';
export type { AccountMembership_RemoveAttributes } from './remove-account-membership';

export const AccountMembershipMutations = {
  build,
  edit,
  remove,
};
