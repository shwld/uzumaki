import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/createMockecResolverInfo';
import { createUserAuthorizedContext } from '../../../../../test/createTestContext';
import { generateUuid } from '../../../../../test/generateUuid';
import { GraphqlServerContext } from '../../../../context';
import { assertMutationResult } from '../../../../../test/assertMutationResult';
import type { JoinProjectMemberSuccessResult } from '../../../../generated/resolversTypes';
import { joinProjectMember } from '.';
import type {
  ProjectEntity,
  ProjectMemberInvitationTokenEntity,
} from 'core-domain';
import {
  createTestProjectByUser,
  createTestProjectMemberInvitationWithToken,
  createTestUser,
} from 'db/src/testData';

let context: Required<GraphqlServerContext>;
const info = createMockedResolverInfo();
let project: ProjectEntity;
let invitationToken: ProjectMemberInvitationTokenEntity;
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
  const otherUser = await createTestUser();
  const testData = await createTestProjectByUser(otherUser);
  project = testData.project;
  invitationToken = await createTestProjectMemberInvitationWithToken(project);
});

describe('joinProjectMember', async () => {
  const id = generateUuid();
  const subject = async () => {
    return await joinProjectMember(
      {},
      { input: { id, confirmationToken: invitationToken.confirmationToken } },
      context,
      info
    );
  };
  test('result is success', async () => {
    const response = await subject();
    expect(response.__typename).to.eq('JoinProjectMemberSuccessResult');
    assertMutationResult<JoinProjectMemberSuccessResult>(response);
    expect(response.result).toEqual(
      expect.objectContaining({
        id,
      })
    );
  });
});
