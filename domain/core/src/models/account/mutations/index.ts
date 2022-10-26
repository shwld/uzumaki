import { build } from './build-account';
import { edit } from './edit-account';
import { remove } from './remove-account';
export type {
  Account_BuildInput,
  Account_BuiltAttributes,
} from './build-account';
export type {
  Account_EditInput,
  Account_DraftAttributes,
} from './edit-account';
export type { Account_RemoveAttributes } from './remove-account';

export const AccountMutations = {
  build,
  edit,
  remove,
};
