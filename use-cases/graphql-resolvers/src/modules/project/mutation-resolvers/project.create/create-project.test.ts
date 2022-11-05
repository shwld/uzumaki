import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/createMockecResolverInfo';
import { createUserAuthorizedContext } from '../../../../../test/createTestContext';
import { generateUuid } from '../../../../../test/generateUuid';
import { GraphqlServerContext } from '../../../../context';
import { assertMutationResult } from '../../../../../test/assertMutationResult';
import {
  CreateProjectSuccessResult,
  ProjectPrivacy,
} from '../../../../generated/resolvers-types';
import { createProject } from '.';
import { AccountEntity } from 'core-domain';
import { createTestAccount } from 'db/src/test-data';

let context: Required<GraphqlServerContext>;
const info = createMockedResolverInfo();
let account: AccountEntity;
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
  account = await createTestAccount(context.currentUser!);
});

describe('createProject', async () => {
  const id = generateUuid();
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
