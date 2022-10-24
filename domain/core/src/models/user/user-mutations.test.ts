import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { pipe, Either } from '../../shared/functional';
import { UserEntity } from './user-entity';
import { User_BuildInput, User_Record } from './user-interfaces';
import { UserMutations } from './user-mutations';

describe('build new user', async () => {
  const validInput: User_BuildInput = {
    __state: 'Unvalidated',
    id: generateId(),
    uid: 'hoge-hoge-hoge',
    email: 'test@example.com',
    name: 'new user',
    avatarImageUrl: 'https://example.com/image.png',
  };

  describe('case: valid input', async () => {
    test('can build', async () => {
      const build = UserMutations.build(validInput);
      const newUser = await build();
      expect(Either.isRight(newUser)).toBe(true);
      expect(
        pipe(
          newUser,
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
      const invalidInput: User_BuildInput = {
        ...validInput,
        id: '',
      };
      const build = UserMutations.build(invalidInput);
      const newUser = await build();
      expect(Either.isLeft(newUser)).toBe(true);
      expect(
        pipe(
          newUser,
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
  const record: User_Record = {
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    uid: 'hoge-hoge-hoge',
    email: 'test@example.com',
    name: 'test user',
    avatarImageUrl: 'https://example.com/image.png',
  };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const user = UserEntity.fromRecord(record);
      expect(user.name).eq('test user');
      const edit = UserMutations.edit({
        __state: 'Unvalidated',
        name: 'test user edited',
      })(user);
      const newUser = await edit();
      console.log({ left: Either.isLeft(newUser) && newUser.left });
      expect(Either.isRight(newUser)).toBe(true);
      expect(
        pipe(
          newUser,
          Either.match(
            a => a.message,
            a => a.name
          )
        )
      ).toEqual('test user edited');
    });
  });

  describe('case: invalid input', async () => {
    test('can not edit', async () => {
      const user = UserEntity.fromRecord(record);
      expect(user.name).eq('test user');
      const edit = UserMutations.edit({
        __state: 'Unvalidated',
        name: undefined,
      })(user);
      const newUser = await edit();
      expect(Either.isLeft(newUser)).toBe(true);
      expect(
        pipe(
          newUser,
          Either.match(
            a => a.message,
            a => a.name
          )
        )
      ).toContain('Validation Error');
    });
  });
});

describe('remove', async () => {
  const record: User_Record = {
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    uid: 'hoge-hoge-hoge',
    email: 'test@example.com',
    name: 'test user',
    avatarImageUrl: 'https://example.com/image.png',
  };

  test('can remove', async () => {
    const user = UserEntity.fromRecord(record);
    expect(user.__state).eq('Validated');
    const newUser = UserMutations.remove(user);
    expect(newUser.__state).eq('Removing');
  });
});
