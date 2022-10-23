import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { AccountEntity } from './account-entity';
import { Account_BuildInput, Account_Record } from './account-interfaces';
import { AccountMutations } from './account-mutations';

describe('build new account', async () => {
  const validInput: Account_BuildInput = {
    __state: 'Unvalidated',
    id: generateId(),
    name: 'test account',
    createdById: generateId(),
  };

  describe('case: valid input', async () => {
    test('can build', async () => {
      const build = AccountMutations.build(validInput);
      const newAccount = await build();
      expect(E.isRight(newAccount)).toBe(true);
      expect(
        pipe(
          newAccount,
          E.match(
            a => a.message,
            a => a.__state
          )
        )
      ).toEqual('Built');
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
      expect(E.isLeft(newAccount)).toBe(true);
      expect(
        pipe(
          newAccount,
          E.match(
            a => a.message,
            a => a.__state
          )
        )
      ).toContain('Validation Error');
    });
  });
});

describe('edit', async () => {
  const record: Account_Record = {
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'test account',
  };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const account = AccountEntity.fromRecord(record);
      expect(account.name).eq('test account');
      const edit = AccountMutations.edit({
        __state: 'Unvalidated',
        name: 'test account edited',
      })(account);
      const newAccount = await edit();
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
    test('can not edit', async () => {
      const account = AccountEntity.fromRecord(record);
      expect(account.name).eq('test account');
      const edit = AccountMutations.edit({
        __state: 'Unvalidated',
        name: undefined,
      })(account);
      const newAccount = await edit();
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
  };

  test('can remove', async () => {
    const account = AccountEntity.fromRecord(record);
    expect(account.__state).eq('Validated');
    const newAccount = AccountMutations.remove(account);
    expect(newAccount.__state).eq('Removing');
  });
});
