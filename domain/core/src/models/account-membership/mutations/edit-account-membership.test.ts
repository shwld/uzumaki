import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { Either } from '../../../shared/result';
import { AccountMembershipMutations } from '.';
import { AccountMembership_EditInput } from './edit-account-membership';
import { AccountMembership_Attributes } from '../account-membership-interfaces';

describe('edit new account', async () => {
  const record: AccountMembership_Attributes = {
    userId: generateId(),
    accountId: generateId(),
    role: 'OWNER',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const validInput: AccountMembership_EditInput = { role: 'MEMBER' };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const edit = AccountMembershipMutations.edit(validInput);
      const newAccountMembership = await edit(record)();
      expect(Either.isRight(newAccountMembership)).toBe(true);
      expect(
        Either.isRight(newAccountMembership) && newAccountMembership.right.role
      ).eq('MEMBER');
    });
  });
});
