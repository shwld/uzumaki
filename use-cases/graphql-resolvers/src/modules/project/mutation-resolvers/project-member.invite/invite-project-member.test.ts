import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/createMockedResolverInfo';
import { createUserAuthorizedContext } from '../../../../../test/createTestContext';
import { generateUuid } from '../../../../../test/generateUuid';
import { GraphqlServerContext } from '../../../../context';
import { assertMutationResult } from '../../../../../test/assertMutationResult';
import {
  InviteProjectMemberSuccessResult,
  ProjectMemberRole,
} from '../../../../generated/resolvers-types';
import { inviteProjectMember } from '.';
import { ProjectEntity } from 'core-domain';
import { createTestProjectByUser } from 'db/src/test-data';

let context: Required<GraphqlServerContext>;
const info = createMockedResolverInfo();
let project: ProjectEntity;
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
  const testData = await createTestProjectByUser(context.currentUser!);
  project = testData.project;
});

describe('inviteProjectMember', async () => {
  const id = generateUuid();
  const subject = async () => {
    return await inviteProjectMember(
      {},
      {
        input: {
          id,
          projectId: project.id,
          userEmail: 'hoge@example.com',
          role: ProjectMemberRole.Member,
        },
      },
      context,
      info
    );
  };
  test('result is success', async () => {
    const response = await subject();
    console.log(response);
    expect(response.__typename).to.eq('InviteProjectMemberSuccessResult');
    assertMutationResult<InviteProjectMemberSuccessResult>(response);
    expect(response.result).toEqual(
      expect.objectContaining({
        id,
      })
    );
  });
});
