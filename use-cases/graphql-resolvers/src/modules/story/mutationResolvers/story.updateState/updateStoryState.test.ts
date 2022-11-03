import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/createMockecResolverInfo';
import { createUserAuthorizedContext } from '../../../../../test/createTestContext';
import { GraphqlServerContext } from '../../../../context';
import { assertMutationResult } from '../../../../../test/assertMutationResult';
import {
  StoryState,
  UpdateStoryStateSuccessResult,
} from '../../../../generated/resolvers-types';
import { updateStoryState } from '.';
import { StoryEntity } from 'core-domain';
import { createTestProjectByUser, createTestStory } from 'db/src/testData';

let context: Required<GraphqlServerContext>;
const info = createMockedResolverInfo();
let story: StoryEntity;
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
  const testData = await createTestProjectByUser(context.currentUser);

  story = await createTestStory(testData.project, testData.projectMember);
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
