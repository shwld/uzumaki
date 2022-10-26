import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/entity';
import { Either } from '../../../shared/functional';
import { AccountMutations } from '.';
import { Account_BuildInput } from './account-mutate-build';
import { Account_Attributes } from '../account-interfaces';
import { STATE_IS_REMOVING } from '../../../shared/interfaces';

describe('remove new account', async () => {
  const record: Account_Attributes = {
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'test account',
    createdById: null,
  };
  const validInput: Account_BuildInput = {
    id: generateId(),
    name: 'test account',
    createdById: generateId(),
  };

  describe('case: valid input', async () => {
    test('can remove', async () => {
      const remove = AccountMutations.remove(validInput);
      const newAccount = await remove(record)();
      expect(Either.isRight(newAccount)).toBe(true);
      expect(Either.isRight(newAccount) && newAccount.right.__state).eq(
        STATE_IS_REMOVING
      );
    });
  });

  describe('case: invalid input', async () => {
    test('can not remove', async () => {
      const invalidInput: Account_BuildInput = {
        ...validInput,
        id: '',
      };
      const remove = AccountMutations.remove(invalidInput);
      const newAccount = await remove(record)();
      expect(Either.isLeft(newAccount)).toBe(true);
      expect(Either.isLeft(newAccount) && newAccount.left.message).toContain(
        'Validation Error'
      );
    });
  });
});
