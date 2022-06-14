import { db } from 'db';
import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/createMockecResolverInfo';
import { createUserAuthorizedContext } from '../../../../../test/createTestContext';
import { GraphqlServerContext } from '../../../../context';
import { updateTodoTitle } from '.';
import { createTestTodo } from 'db/src/testData';
import { generateUuid } from '../../../../../test/generateUuid';

let context: Required<GraphqlServerContext>;
const info = createMockedResolverInfo();
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
});

describe('updateTodoTitle', async () => {
  const id = generateUuid();

  const subject = async () => {
    return await updateTodoTitle(
      {},
      { input: { id, title: 'hoge' } },
      context,
      info
    );
  };
  test('result is success', async () => {
    await createTestTodo(context.currentUser, { id });
    const response = await subject();
    expect(response).toHaveProperty('result');
    if ('result' in response) {
      expect(response.result).toEqual(
        expect.objectContaining({
          done: false,
          id,
          title: 'hoge',
          userId: context.currentUser.id,
        })
      );
    }
  });

  test('todo record is created', async () => {
    await createTestTodo(context.currentUser, { id });
    const beforeDbRecord = await db.todo.findBy({
      id,
      user: context.currentUser,
    });
    expect(beforeDbRecord).toBeUndefined();
    await subject();
    const afterDbRecord = await db.todo.findBy({
      id,
      user: context.currentUser,
    });
    expect(afterDbRecord?.id).toBe(id);
  });
});
