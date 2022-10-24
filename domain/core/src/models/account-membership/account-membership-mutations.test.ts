import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { pipe, Either } from '../../shared/functional';
import { AccountMembershipEntity } from './account-membership-entity';
import {
  AccountMembership_BuildInput,
  AccountMembership_Record,
} from './account-membership-interfaces';
import { AccountMembershipMutations } from './account-membership-mutations';

describe('build new account-membership', async () => {
  const validInput: AccountMembership_BuildInput = {
    __state: 'Unvalidated',
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
        pipe(
          newAccountMembership,
          Either.match(
            a => a.message,
            a => a.__state
          )
        )
      ).toEqual('Built');
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
        pipe(
          newAccountMembership,
          Either.match(
            a => a.message,
            a => a.__state
          )
        )
      ).toContain('Validation Error');
    });
  });
});

describe('edit', async () => {
  const record: AccountMembership_Record = {
    userId: generateId(),
    accountId: generateId(),
    role: 'OWNER',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const accountMembership = AccountMembershipEntity.fromRecord(record);
      expect(accountMembership.role).eq('OWNER');
      const edit = AccountMembershipMutations.edit({
        __state: 'Unvalidated',
        role: 'MEMBER',
      })(accountMembership);
      const newAccountMembership = await edit();
      expect(Either.isRight(newAccountMembership)).toBe(true);
      expect(
        pipe(
          newAccountMembership,
          Either.match(
            a => a.message,
            a => a.role
          )
        )
      ).toEqual('MEMBER');
    });
  });

  describe('case: invalid input', async () => {
    test('can not edit', async () => {
      const accountMembership = AccountMembershipEntity.fromRecord(record);
      expect(accountMembership.role).eq('OWNER');
      const edit = AccountMembershipMutations.edit({
        __state: 'Unvalidated',
        role: undefined,
      })(accountMembership);
      const newAccountMembership = await edit();
      expect(Either.isLeft(newAccountMembership)).toBe(true);
      expect(
        pipe(
          newAccountMembership,
          Either.match(
            a => a.message,
            a => a.role
          )
        )
      ).toContain('Validation Error');
    });
  });
});

describe('remove', async () => {
  const record: AccountMembership_Record = {
    userId: generateId(),
    accountId: generateId(),
    role: 'OWNER',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test('can remove', async () => {
    const accountMembership = AccountMembershipEntity.fromRecord(record);
    expect(accountMembership.__state).eq('Validated');
    const newAccountMembership =
      AccountMembershipMutations.remove(accountMembership);
    expect(newAccountMembership.__state).eq('Removing');
  });
});
