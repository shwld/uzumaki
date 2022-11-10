import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/createMockedResolverInfo';
import {
  AuthorizedContext,
  createUserAuthorizedContext,
} from '../../../../../test/createTestContext';
import { assertMutationResult } from '../../../../../test/assertMutationResult';
import {
  StoryKind,
  StoryState,
  UpdateStorySuccessResult,
} from '../../../../generated/resolvers-types';
import { updateStory } from '.';
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
    requester: context.currentUser,
  });
});

describe('updateStory', async () => {
  const subject = async () => {
    return await updateStory(
      {},
      {
        input: {
          id: story.id,
          title: 'test story updated',
          description: 'test story description',
          state: StoryState.Unstarted,
          kind: StoryKind.Feature,
          points: 12,
        },
      },
      context,
      info
    );
  };
  test('result is success', async () => {
    const response = await subject();
    expect(response.__typename).to.eq('UpdateStorySuccessResult');
    assertMutationResult<UpdateStorySuccessResult>(response);
    expect(response.result).toEqual(
      expect.objectContaining({
        id: story.id,
      })
    );
  });
});
