import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/create-mocked-resolver-info';
import {
  AuthorizedContext,
  createUserAuthorizedContext,
} from '../../../../../test/create-test-context';
import { assertMutationResult } from '../../../../../test/assert-mutation-result';
import type { UpdateUserProfileSuccessResult } from '../../../../generated/resolvers-types';
import { updateUserProfile } from '.';

let context: AuthorizedContext;
const info = createMockedResolverInfo();
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
});

describe('updateUserProfile', async () => {
  const subject = async () => {
    return await updateUserProfile(
      {},
      { input: { name: 'test user' } },
      context,
      info
    );
  };
  test('result is success', async () => {
    const response = await subject();
    expect(response.__typename).to.eq('UpdateUserProfileSuccessResult');
    assertMutationResult<UpdateUserProfileSuccessResult>(response);
    expect(response.result).toEqual(
      expect.objectContaining({
        name: 'test user',
      })
    );
  });
});
