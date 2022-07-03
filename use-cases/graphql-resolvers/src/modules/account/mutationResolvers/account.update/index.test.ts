import { db } from 'db';
import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/createMockecResolverInfo';
import { createUserAuthorizedContext } from '../../../../../test/createTestContext';
import { generateUuid } from '../../../../../test/generateUuid';
import { GraphqlServerContext } from '../../../../context';
import { updateAccount } from '.';
import { createTestAccount } from 'db/src/testData/accountFactory';
import { assertMutationResult } from '../../../../../test/assertMutationResult';
import { UpdateAccountSuccessResult } from '../../../../generated/resolversTypes';

let context: Required<GraphqlServerContext>;
const info = createMockedResolverInfo();
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
});

describe('updateAccount', async () => {
  const id = generateUuid();
  const subject = async () => {
    return await updateAccount(
      {},
      { input: { id, name: 'new account' } },
      context,
      info
    );
  };
  test('result is success', async () => {
    const ac = await createTestAccount(context.currentUser, { id });
    const response = await subject();
    expect(response.__typename).to.eq('UpdateAccountSuccessResult');
    assertMutationResult<UpdateAccountSuccessResult>(response);
    expect(response.result).toEqual(
      expect.objectContaining({
        id,
        name: 'new account',
      })
    );
  });
});
