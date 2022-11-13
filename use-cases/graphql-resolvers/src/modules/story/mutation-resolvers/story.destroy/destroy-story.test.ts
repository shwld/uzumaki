import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/create-mocked-resolver-info';
import {
  AuthorizedContext,
  createUserAuthorizedContext,
} from '../../../../../test/create-test-context';
import { assertMutationResult } from '../../../../../test/assert-mutation-result';
import type { DestroyStorySuccessResult } from '../../../../generated/resolvers-types';
import { destroyStory } from '.';
import { StoryEntity } from 'core-domain';
import { createTestProjectByUser, createTestStory } from 'db/src/test-data';

let context: AuthorizedContext;
const info = createMockedResolverInfo();
let story: StoryEntity;
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
  const testData = await createTestProjectByUser(context.currentUser);

  story = await createTestStory({
    project: testData.project,
    member: testData.member,
  });
});

describe('destroyStory', async () => {
  const subject = async () => {
    return await destroyStory({}, { input: { id: story.id } }, context, info);
  };
  test('result is success', async () => {
    const response = await subject();
    expect(response.__typename).to.eq('DestroyStorySuccessResult');
    assertMutationResult<DestroyStorySuccessResult>(response);
    expect(response.result).toEqual(
      expect.objectContaining({
        id: story.id,
      })
    );
  });
});
