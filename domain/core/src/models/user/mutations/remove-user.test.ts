import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { UserMutations } from '.';
import { User_Attributes } from '../user-interfaces';
import { STATE_IS_REMOVING } from '../../../shared/interfaces';

describe('remove new user', async () => {
  const record: User_Attributes = {
    id: generateId(),
    uid: generateId(),
    email: 'test@example.com',
    name: 'my user',
    avatarImageUrl: 'https://example.com/image.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test('can remove', async () => {
    const newUser = UserMutations.remove(record);
    expect(newUser.__state).toBe(STATE_IS_REMOVING);
  });
});
