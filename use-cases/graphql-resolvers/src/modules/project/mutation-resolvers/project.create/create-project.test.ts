import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/create-mocked-resolver-info';
import {
  AuthorizedContext,
  createUserAuthorizedContext,
} from '../../../../../test/create-test-context';
import { assertMutationResult } from '../../../../../test/assert-mutation-result';
import {
  CreateProjectSuccessResult,
  ProjectPrivacy,
} from '../../../../generated/resolvers-types';
import { createProject } from '.';
import { AccountEntity, generateId } from 'core-domain';
import { createTestAccount } from 'db/src/test-data';

let context: AuthorizedContext;
const info = createMockedResolverInfo();
let account: AccountEntity;
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
  account = await createTestAccount(context.currentUser);
});

describe('createProject', async () => {
  const id = generateId();
  const subject = async () => {
    return await createProject(
      {},
      {
        input: {
          id,
          name: 'test name',
          description: 'test description',
          privacy: ProjectPrivacy.Private,
          initialVelocity: 10,
          accountId: account.id,
        },
      },
      context,
      info
    );
  };
  test('result is success', async () => {
    const response = await subject();
    expect(response.__typename).to.eq('CreateProjectSuccessResult');
    assertMutationResult<CreateProjectSuccessResult>(response);
    expect(response.result).toEqual(
      expect.objectContaining({
        id,
      })
    );
  });
});
