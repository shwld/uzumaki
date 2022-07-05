import { db } from 'db';
import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/createMockecResolverInfo';
import { createUserAuthorizedContext } from '../../../../../test/createTestContext';
import { generateUuid } from '../../../../../test/generateUuid';
import { GraphqlServerContext } from '../../../../context';
import { assertMutationResult } from '../../../../../test/assertMutationResult';
import type { CreateProjectSuccessResult } from '../../../../generated/resolversTypes';
import { createProject } from '.';

let context: Required<GraphqlServerContext>;
const info = createMockedResolverInfo();
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
});

describe('createProject', async () => {
  const id = generateUuid();
  const subject = async () => {
    return await createProject(
      {},
      { input: { id } },
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
