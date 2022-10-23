import { InvalidAttributesError } from '../../shared/error';
import type {
  Account_Attributes,
  Account_BuildInput,
  Account_BuildValidInput,
  Account_EditInput,
  Account_EditValidInput,
  Account_RemoveValidInput,
} from './account-interfaces';
import { validateOnBuild, validateOnEdit } from './account-validator';
import { pipe, Result } from '../../shared/functional';

const build = (
  input: Account_BuildInput
): Result<InvalidAttributesError, Account_BuildValidInput> => {
  return pipe(input, validateOnBuild);
};

const edit =
  (input: Partial<Account_EditInput>) =>
  (
    item: Account_Attributes
  ): Result<InvalidAttributesError, Account_EditValidInput> => {
    const newRecord: Account_EditInput = {
      id: item.id,
      name: item.name,
      ...input,
      __state: 'Unvalidated',
    };
    return pipe(newRecord, validateOnEdit);
  };

const remove =
  () =>
  (item: Account_Attributes): Account_RemoveValidInput => {
    return { ...item, __state: 'Removing' };
  };

export const AccountMutations = {
  build,
  edit,
  remove,
};
