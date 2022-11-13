import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { AccountMembershipMutations } from '.';
import { AccountMembership_Attributes } from '../account-membership-interfaces';
import { STATE_IS_REMOVING } from '../../../shared/interfaces';

describe('remove new account', async () => {
  const record: AccountMembership_Attributes = {
    userId: generateId(),
    accountId: generateId(),
    role: 'OWNER',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test('can remove', async () => {
    const newAccountMembership = AccountMembershipMutations.remove(record);
    expect(newAccountMembership.__state).toBe(STATE_IS_REMOVING);
  });
});
