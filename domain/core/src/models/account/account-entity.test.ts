import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { AccountEntity } from './account-entity';
import { Account_Record } from './account-interfaces';

describe('update', async () => {
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
        name: 'test account edited',
      });
      expect(E.isRight(newAccount)).toBe(true);
      expect(
        pipe(
          newAccount,
          E.match(
            a => a.message(),
            a => a.name
          )
        )
      ).toEqual('test account edited');
    });
  });
});
