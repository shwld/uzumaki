import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/createMockecResolverInfo';
import { createUserAuthorizedContext } from '../../../../../test/createTestContext';
import { GraphqlServerContext } from '../../../../context';
import { assertMutationResult } from '../../../../../test/assertMutationResult';
import type { DestroyStorySuccessResult } from '../../../../generated/resolversTypes';
import { destroyStory } from '.';
import { AccountEntity, ProjectEntity, StoryEntity } from 'core-domain';
import {
  createTestAccount,
  createTestProject,
  createTestStory,
} from 'db/src/testData';

let context: Required<GraphqlServerContext>;
const info = createMockedResolverInfo();
let account: AccountEntity;
let project: ProjectEntity;
let story: StoryEntity;
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
  account = await createTestAccount(context.currentUser);
  project = await createTestProject(account);
  story = await createTestStory(project);
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
