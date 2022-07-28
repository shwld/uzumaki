import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/createMockecResolverInfo';
import { createUserAuthorizedContext } from '../../../../../test/createTestContext';
import { generateUuid } from '../../../../../test/generateUuid';
import { GraphqlServerContext } from '../../../../context';
import { assertMutationResult } from '../../../../../test/assertMutationResult';
import {
  CreateStorySuccessResult,
  StoryKind,
  StoryPosition,
  StoryState,
} from '../../../../generated/resolversTypes';
import { createStory } from '.';
import { ProjectEntity } from 'core-domain';
import { createTestProjectByUser } from 'db/src/testData/projectFactory';

let context: Required<GraphqlServerContext>;
const info = createMockedResolverInfo();
let project: ProjectEntity;
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
  const testData = await createTestProjectByUser(context.currentUser);
  project = testData.project;
});

describe('createStory', async () => {
  const id = generateUuid();
  const subject = async () => {
    return await createStory(
      {},
      {
        input: {
          id,
          title: 'test title',
          description: 'test description',
          state: StoryState.Unstarted,
          kind: StoryKind.Feature,
          projectId: project.id,
          position: StoryPosition.Backlog,
          priority: 0,
          requesterId: context.currentUser.id,
        },
      },
      context,
      info
    );
  };
  test('result is success', async () => {
    const response = await subject();
    expect(response.__typename).to.eq('CreateStorySuccessResult');
    assertMutationResult<CreateStorySuccessResult>(response);
    expect(response.result).toEqual(
      expect.objectContaining({
        id,
      })
    );
  });
});
