import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/create-mocked-resolver-info';
import {
  AuthorizedContext,
  createUserAuthorizedContext,
} from '../../../../../test/create-test-context';
import { updateAccount } from '.';
import { createTestAccount } from 'db/src/test-data';
import { assertMutationResult } from '../../../../../test/assert-mutation-result';
import { UpdateAccountSuccessResult } from '../../../../generated/resolvers-types';
import { generateId } from 'core-domain';

let context: AuthorizedContext;
const info = createMockedResolverInfo();
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
});

describe('updateAccount', async () => {
  const id = generateId();
  const subject = async () => {
    return await updateAccount(
      {},
      { input: { id, name: 'new account' } },
      context,
      info
    );
  };
  test('result is success', async () => {
    await createTestAccount(context.currentUser, { id });
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
