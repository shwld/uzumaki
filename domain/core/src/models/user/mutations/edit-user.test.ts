import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { Either } from '../../../shared';
import { UserMutations } from '.';
import { User_EditInput } from './edit-user';
import { User_Attributes } from '../user-interfaces';

describe('edit new user', async () => {
  const record: User_Attributes = {
    id: generateId(),
    uid: generateId(),
    email: 'test@example.com',
    name: 'my user',
    avatarImageUrl: 'https://example.com/image.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const validInput: User_EditInput = {
    name: 'test user',
  };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const edit = UserMutations.edit(validInput);
      const newUser = await edit(record)();
      expect(Either.isRight(newUser)).toBe(true);
      expect(Either.isRight(newUser) && newUser.right.name).eq('test user');
    });
  });

  describe('case: invalid input', async () => {
    test('can not edit', async () => {
      const invalidInput: User_EditInput = {
        ...validInput,
        avatarImageUrl: '',
      };
      const edit = UserMutations.edit(invalidInput);
      const newUser = await edit(record)();
      expect(Either.isLeft(newUser)).toBe(true);
      expect(Either.isLeft(newUser) && newUser.left.message).toContain(
        'Validation Error'
      );
    });
  });
});
