import { describe, expect, test } from 'vitest';
import { buildUser } from '../../aggregates/factories';
import { generateId } from '../shared';
import { TodoEntity } from './entity';

describe('updateTitle', async () => {
  const user = buildUser({
    id: generateId(),
    email: 'test@example.com',
    name: 'test',
    avatarImageUrl: 'https://example.com/picture.png',
  });
  const todo = new TodoEntity({
    id: generateId(),
    title: 'test',
    userId: user.id,
    done: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  test('update title to "updated"', async () => {
    expect(todo.title).eq('test');
    const newTest = todo.updateTitle('updated');
    expect(newTest.title).eq('updated');
  });
});
