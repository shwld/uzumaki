import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/create-mocked-resolver-info';
import { createUserAuthorizedContext } from '../../../../../test/create-test-context';
import { GraphqlServerContext } from '../../../../context';
import { assertMutationResult } from '../../../../../test/assert-mutation-result';
import type { JoinProjectMemberSuccessResult } from '../../../../generated/resolvers-types';
import { joinProjectMember } from '.';
import {
  generateId,
  ProjectEntity,
  ProjectMemberInvitationTokenEntity,
} from 'core-domain';
import {
  createTestProjectByUser,
  createTestProjectMemberInvitationWithToken,
  createTestUser,
} from 'db/src/test-data';

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
  const { token } = await createTestProjectMemberInvitationWithToken({
    projectId: project.id,
    email: context.currentUser?.email,
  });
  invitationToken = token;
});

describe('joinProjectMember', async () => {
  const memberId = generateId();
  const subject = async () => {
    return await joinProjectMember(
      {},
      { input: { memberId, confirmationToken: invitationToken.id } },
      context,
      info
    );
  };
  test('result is success', async () => {
    const response = await subject();
    expect(response.__typename).to.eq('JoinProjectMemberSuccessResult');
    assertMutationResult<JoinProjectMemberSuccessResult>(response);
    expect(response.result).toBeTruthy();
  });
});
