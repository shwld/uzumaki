import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { AccountEntity } from './account-entity';
import { Account_Record } from './account-interfaces';

describe('edit', async () => {
  const record: Account_Record = {
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'test account',
    createdById: null,
  };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const account = AccountEntity.fromRecord(record);
      expect(account.name).eq('test account');
      const newAccount = AccountEntity(account).edit({
        __state: 'Unvalidated',
        name: 'test account edited',
      });
      expect(E.isRight(newAccount)).toBe(true);
      expect(
        pipe(
          newAccount,
          E.match(
            a => a.message,
            a => a.name
          )
        )
      ).toEqual('test account edited');
    });
  });

  describe('case: invalid input', async () => {
    test('can edit', async () => {
      const account = AccountEntity.fromRecord(record);
      expect(account.name).eq('test account');
      const newAccount = AccountEntity(account).edit({
        __state: 'Unvalidated',
        name: undefined,
      });
      expect(E.isLeft(newAccount)).toBe(true);
      expect(
        pipe(
          newAccount,
          E.match(
            a => a.message,
            a => a.name
          )
        )
      ).toContain('Validation Error');
    });
  });
});

describe('remove', async () => {
  const record: Account_Record = {
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'test account',
    createdById: null,
  };

  test('can remove', async () => {
    const account = AccountEntity.fromRecord(record);
    expect(account.__state).eq('Validated');
    const newAccount = AccountEntity(account).remove();
    expect(newAccount.__state).eq('Removing');
  });
});
