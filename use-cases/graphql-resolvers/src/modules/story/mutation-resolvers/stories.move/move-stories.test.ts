import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/create-mocked-resolver-info';
import { createUserAuthorizedContext } from '../../../../../test/create-test-context';
import { GraphqlServerContext } from '../../../../context';
import { assertMutationResult } from '../../../../../test/assert-mutation-result';
import {
  MoveStoriesSuccessResult,
  StoryPosition,
} from '../../../../generated/resolvers-types';
import { moveStories } from '.';
import { StoryEntity } from 'core-domain';
import { createTestProjectByUser, createTestStory } from 'db/src/test-data';

let context: Required<GraphqlServerContext>;
const info = createMockedResolverInfo();
let story: StoryEntity;
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
  const testData = await createTestProjectByUser(context.currentUser!);

  story = await createTestStory({
    project: testData.project,
    member: testData.member,
  });
});

describe('moveStories', async () => {
  const subject = async () => {
    return await moveStories(
      {},
      {
        input: {
          projectId: story.projectId,
          stories: [
            {
              id: story.id,
              position: StoryPosition.Icebox,
              priority: 1,
            },
          ],
        },
      },
      context,
      info
    );
  };
  test('result is success', async () => {
    const response = await subject();
    expect(response.__typename).to.eq('MoveStoriesSuccessResult');
    assertMutationResult<MoveStoriesSuccessResult>(response);
    expect(response.result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: story.id,
        }),
      ])
    );
  });
});
