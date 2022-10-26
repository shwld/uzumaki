import { build } from './account-mutate-build';
import { edit } from './account-mutate-edit';
import { remove } from './account-mutate-remove';
export type {
  Account_BuildInput,
  Account_BuiltAttributes,
} from './account-mutate-build';
export type {
  Account_EditInput,
  Account_DraftAttributes,
} from './account-mutate-edit';
export type {
  Account_RemoveInput,
  Account_RemoveAttributes,
} from './account-mutate-remove';

export const AccountMutations = {
  build,
  edit,
  remove,
};
