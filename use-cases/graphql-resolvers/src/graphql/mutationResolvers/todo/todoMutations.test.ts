import { describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../test/createMockecResolverInfo';
import { createUserAuthorizedContext } from '../../../../test/createTestContext';
import { generateUuid } from '../../../../test/generateUuid';
import { createTodo } from './todoMutations';

describe('createTodo', () => {
  const context = createUserAuthorizedContext();
  const info = createMockedResolverInfo();

  test('result is success', async () => {
    const id = generateUuid();
    const response = await createTodo(
      {},
      { input: { id, title: 'hoge' } },
      context,
      info
    );
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
});
