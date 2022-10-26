import { build } from './user-mutate-build';
import { edit } from './user-mutate-edit';
import { remove } from './account-mutate-remove';
export type {
  Account_BuildInput,
  Account_BuiltAttributes,
} from './user-mutate-build';
export type {
  Account_EditInput,
  Account_DraftAttributes,
} from './user-mutate-edit';
export type { Account_RemoveAttributes } from './account-mutate-remove';

export const AccountMutations = {
  build,
  edit,
  remove,
};
