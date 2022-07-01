import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { AccountUserEntity } from './entity';

describe('initialize', async () => {
  const accountUser = new AccountUserEntity({
    userId: 'test-user|00001',
    accountId: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  test('userId is correct', async () => {
    expect(accountUser.userId).toEqual('test-user|00001');
  });
});
