import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { AccountMembershipEntity } from './AccountEntity';

describe('initialize', async () => {
  const accountUser = new AccountMembershipEntity({
    userId: 'test-user|00001',
    accountId: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 'OWNER',
  });

  test('userId is correct', async () => {
    expect(accountUser.userId).toEqual('test-user|00001');
  });
});
