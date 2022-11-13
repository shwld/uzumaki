import { db } from 'db';
import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/create-mocked-resolver-info';
import { createUserAuthorizedContext } from '../../../../../test/create-test-context';
import { generateUuid } from '../../../../../test/generate-uuid';
import { GraphqlServerContext } from '../../../../context';
import { assertMutationResult } from '../../../../../test/assert-mutation-result';
import { createAccount } from './create-account';
import { CreateAccountSuccessResult } from '../../../../generated/resolvers-types';
import { getOrThrow } from 'core-domain';

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
    const beforeDbRecord = await getOrThrow(
      db.account.findBy({
        id,
      })
    );
    expect(beforeDbRecord).toBeNull();
    await subject();
    const afterDbRecord = await getOrThrow(
      db.account.findBy({
        id,
      })
    );
    expect(afterDbRecord?.id).toBe(id);
  });
});
