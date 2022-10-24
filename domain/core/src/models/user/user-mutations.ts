import { InvalidAttributesError } from '../../shared/error';
import type {
  User_Attributes,
  User_BuildInput,
  User_BuildValidInput,
  User_EditInput,
  User_EditValidInput,
  User_RemoveValidInput,
} from './user-interfaces';
import { validateOnBuild, validateOnEdit } from './user-validator';
import { pipe, Result } from '../../shared/functional';

const build = (
  input: User_BuildInput
): Result<InvalidAttributesError, User_BuildValidInput> => {
  return pipe(input, validateOnBuild);
};

const edit =
  (input: Partial<User_EditInput>) =>
  (
    item: User_Attributes
  ): Result<InvalidAttributesError, User_EditValidInput> => {
    const newRecord: User_EditInput = {
      id: item.id,
      name: item.name,
      avatarImageUrl: item.avatarImageUrl,
      ...input,
      __state: 'Unvalidated',
    };
    return pipe(newRecord, validateOnEdit);
  };

const remove = (item: User_Attributes): User_RemoveValidInput => {
  return { ...item, __state: 'Removing' };
};

export const UserMutations = {
  build,
  edit,
  remove,
};
