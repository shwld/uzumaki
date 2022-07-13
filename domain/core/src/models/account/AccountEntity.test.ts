import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { AccountEntity } from './AccountEntity';

describe('initialize', async () => {
  const account = new AccountEntity({
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'test account',
  });

  test('property is correct', async () => {
    expect(account.name).eq('test account');
  });
});
