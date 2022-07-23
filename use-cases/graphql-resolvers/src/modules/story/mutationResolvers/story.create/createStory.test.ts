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
import { AccountEntity, ProjectEntity } from 'core-domain';
import { createTestAccount } from 'db/src/testData/accountFactory';
import { createTestProject } from 'db/src/testData/projectFactory';
import { createTestProjectMember } from 'db/src/testData';

let context: Required<GraphqlServerContext>;
const info = createMockedResolverInfo();
let account: AccountEntity;
let project: ProjectEntity;
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
  account = await createTestAccount(context.currentUser);
  project = await createTestProject(account, context.currentUser);
  await createTestProjectMember(project, context.currentUser);
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
