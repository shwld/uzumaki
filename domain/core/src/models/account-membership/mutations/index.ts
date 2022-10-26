import { build } from './account-membership-mutate-build';
import { edit } from './account-membership-mutate-edit';
import { remove } from './account-membership-mutate-remove';
export type {
  AccountMembership_BuildInput,
  AccountMembership_BuiltAttributes,
} from './account-membership-mutate-build';
export type {
  AccountMembership_EditInput,
  AccountMembership_DraftAttributes,
} from './account-membership-mutate-edit';
export type { AccountMembership_RemoveAttributes } from './account-membership-mutate-remove';

export const AccountMembershipMutations = {
  build,
  edit,
  remove,
};
