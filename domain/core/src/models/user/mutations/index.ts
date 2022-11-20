import { build } from './build-user';
import { remove } from './remove-user';
export type { User_BuildInput, User_BuiltAttributes } from './build-user';
export type { User_RemoveAttributes } from './remove-user';

export const UserMutations = {
  build,
  remove,
};
