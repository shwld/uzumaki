import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { Either } from '../../../shared/result';
import { AccountMutations } from '.';
import { Account_BuildInput } from './build-account';

describe('build new account', async () => {
  const validInput: Account_BuildInput = {
    id: generateId(),
    name: 'test account',
    createdById: generateId(),
  };

  describe('case: valid input', async () => {
    test('can build', async () => {
      const build = AccountMutations.build(validInput);
      const newAccount = await build();
      expect(Either.isRight(newAccount)).toBe(true);
      expect(Either.isRight(newAccount) && newAccount.right.name).eq(
        'test account'
      );
    });
  });

  describe('case: invalid input', async () => {
    test('can not build', async () => {
      const invalidInput: Account_BuildInput = {
        ...validInput,
        id: '',
      };
      const build = AccountMutations.build(invalidInput);
      const newAccount = await build();
      expect(Either.isLeft(newAccount)).toBe(true);
      expect(Either.isLeft(newAccount) && newAccount.left.message).toContain(
        'Validation Error'
      );
    });
  });
});
