import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { Either } from '../../../shared';
import { UserProfileMutations } from '.';
import { UserProfile_EditInput } from './edit-user-profile';
import { UserProfile_Attributes } from '../user-profile-interfaces';

describe('edit new user-profile', async () => {
  const record: UserProfile_Attributes = {
    id: generateId(),
    name: 'my user',
    avatarImageUrl: 'https://example.com/image.png',
  };
  const validInput: UserProfile_EditInput = {
    name: 'new user',
  };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const edit = UserProfileMutations.edit(validInput);
      const newUserProfile = await edit(record)();
      expect(Either.isRight(newUserProfile)).toBe(true);
      expect(Either.isRight(newUserProfile) && newUserProfile.right.name).eq(
        'new user'
      );
    });
  });

  describe('case: invalid input', async () => {
    test('can not edit', async () => {
      const invalidInput: UserProfile_EditInput = {
        ...validInput,
        avatarImageUrl: 'invalid',
      };
      const edit = UserProfileMutations.edit(invalidInput);
      const newUserProfile = await edit(record)();
      expect(Either.isLeft(newUserProfile)).toBe(true);
      expect(
        Either.isLeft(newUserProfile) && newUserProfile.left.message
      ).toContain('Validation Error');
    });
  });
});
