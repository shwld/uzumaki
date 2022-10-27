import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/entity';
import { Either } from '../../../shared/functional';
import { UserMutations } from '.';
import { User_BuildInput } from './build-user';

describe('build new user', async () => {
  const validInput: User_BuildInput = {
    id: generateId(),
    uid: generateId(),
    email: 'test@example.com',
    name: 'test user',
    avatarImageUrl: 'https://example.com/image.png',
  };

  describe('case: valid input', async () => {
    test('can build', async () => {
      const build = UserMutations.build(validInput);
      const newUser = await build();
      expect(Either.isRight(newUser)).toBe(true);
      expect(Either.isRight(newUser) && newUser.right.name).eq('test user');
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
      expect(Either.isLeft(newUser) && newUser.left.message).toContain(
        'Validation Error'
      );
    });
  });
});
