import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/createMockedResolverInfo';
import {
  AuthorizedContext,
  createUserAuthorizedContext,
} from '../../../../../test/createTestContext';
import { assertMutationResult } from '../../../../../test/assertMutationResult';
import {
  StoryState,
  UpdateStoryStateSuccessResult,
} from '../../../../generated/resolvers-types';
import { updateStoryState } from '.';
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

describe('updateStoryState', async () => {
  const subject = async () => {
    return await updateStoryState(
      {},
      { input: { id: story.id, state: StoryState.Delivered } },
      context,
      info
    );
  };
  test('result is success', async () => {
    const response = await subject();
    expect(response.__typename).to.eq('UpdateStoryStateSuccessResult');
    assertMutationResult<UpdateStoryStateSuccessResult>(response);
    expect(response.result).toEqual(
      expect.objectContaining({
        id: story.id,
        state: StoryState.Delivered,
      })
    );
  });
});
