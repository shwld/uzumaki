import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/entity';
import { AccountMutations } from '.';
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

  test('can remove', async () => {
    const newAccount = AccountMutations.remove(record);
    expect(newAccount.__state).toBe(STATE_IS_REMOVING);
  });
});
