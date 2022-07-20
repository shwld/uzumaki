import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { UserEntity } from './UserEntity';

describe('initialize', async () => {
  const user = new UserEntity({
    id: generateId(),
    uid: 'unique id',
    email: 'test@example.com',
    name: 'test',
    avatarImageUrl: 'https://example.com/picture.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  test('email is correct', async () => {
    expect(user.email).eq('test@example.com');
  });
});
