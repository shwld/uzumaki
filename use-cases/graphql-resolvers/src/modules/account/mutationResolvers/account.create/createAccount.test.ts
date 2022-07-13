import { db } from 'db';
import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/createMockecResolverInfo';
import { createUserAuthorizedContext } from '../../../../../test/createTestContext';
import { generateUuid } from '../../../../../test/generateUuid';
import { GraphqlServerContext } from '../../../../context';
import { assertMutationResult } from '../../../../../test/assertMutationResult';
import { createAccount } from './createAccount';
import { CreateAccountSuccessResult } from '../../../../generated/resolversTypes';

let context: Required<GraphqlServerContext>;
const info = createMockedResolverInfo();
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
});

describe('createAccount', async () => {
  const id = generateUuid();
  const subject = async () => {
    return await createAccount(
      {},
      { input: { id, name: 'test account' } },
      context,
      info
    );
  };
  test('result is success', async () => {
    const response = await subject();
    expect(response.__typename).to.eq('CreateAccountSuccessResult');
    assertMutationResult<CreateAccountSuccessResult>(response);
    expect(response.result).toEqual(
      expect.objectContaining({
        id,
        name: 'test account',
      })
    );
  });

  test('account record is created', async () => {
    const beforeDbRecord = await db.account.findBy({
      id,
      user: context.currentUser,
    });
    expect(beforeDbRecord).toBeUndefined();
    await subject();
    const afterDbRecord = await db.account.findBy({
      id,
      user: context.currentUser,
    });
    expect(afterDbRecord?.id).toBe(id);
  });
});
