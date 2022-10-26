import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/entity';
import { Either } from '../../../shared/functional';
import { AccountMutations } from '.';
import { Account_BuildInput } from './account-mutate-build';
import { Account_Attributes } from '../account-interfaces';

describe('edit new account', async () => {
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
    test('can edit', async () => {
      const edit = AccountMutations.edit(validInput);
      const newAccount = await edit(record)();
      expect(Either.isRight(newAccount)).toBe(true);
      expect(Either.isRight(newAccount) && newAccount.right.name).eq(
        'test account'
      );
    });
  });

  describe('case: invalid input', async () => {
    test('can not edit', async () => {
      const invalidInput: Account_BuildInput = {
        ...validInput,
        id: '',
      };
      const edit = AccountMutations.edit(invalidInput);
      const newAccount = await edit(record)();
      expect(Either.isLeft(newAccount)).toBe(true);
      expect(Either.isLeft(newAccount) && newAccount.left.message).toContain(
        'Validation Error'
      );
    });
  });
});
