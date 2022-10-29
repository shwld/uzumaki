import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { Either } from '../../../shared/result';
import { AccountMembershipMutations } from '.';
import { AccountMembership_BuildInput } from './build-account-membership';

describe('build new account', async () => {
  const validInput: AccountMembership_BuildInput = {
    userId: generateId(),
    accountId: generateId(),
    role: 'OWNER',
  };

  describe('case: valid input', async () => {
    test('can build', async () => {
      const build = AccountMembershipMutations.build(validInput);
      const newAccountMembership = await build();
      expect(Either.isRight(newAccountMembership)).toBe(true);
      expect(
        Either.isRight(newAccountMembership) && newAccountMembership.right.role
      ).eq('OWNER');
    });
  });

  describe('case: invalid input', async () => {
    test('can not build', async () => {
      const invalidInput: AccountMembership_BuildInput = {
        ...validInput,
        userId: '',
      };
      const build = AccountMembershipMutations.build(invalidInput);
      const newAccountMembership = await build();
      expect(Either.isLeft(newAccountMembership)).toBe(true);
      expect(
        Either.isLeft(newAccountMembership) && newAccountMembership.left.message
      ).toContain('Validation Error');
    });
  });
});
