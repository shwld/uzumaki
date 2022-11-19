import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/create-mocked-resolver-info';
import {
  AuthorizedContext,
  createUserAuthorizedContext,
} from '../../../../../test/create-test-context';
import { assertMutationResult } from '../../../../../test/assert-mutation-result';
import {
  CreateStorySuccessResult,
  StoryKind,
  StoryPosition,
  StoryState,
} from '../../../../generated/resolvers-types';
import { createStory } from '.';
import { generateId, ProjectEntity, ProjectMemberEntity } from 'core-domain';
import { createTestProjectByUser } from 'db/src/test-data/project-factory';

let context: AuthorizedContext;
const info = createMockedResolverInfo();
let project: ProjectEntity;
let requester: ProjectMemberEntity;
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
  const testData = await createTestProjectByUser(context.currentUser);
  project = testData.project;
  requester = testData.member;
});

describe('createStory', async () => {
  const id = generateId();
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
          requesterId: requester.id,
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
