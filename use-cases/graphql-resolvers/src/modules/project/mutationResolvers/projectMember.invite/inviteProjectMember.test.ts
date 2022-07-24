import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/createMockecResolverInfo';
import { createUserAuthorizedContext } from '../../../../../test/createTestContext';
import { generateUuid } from '../../../../../test/generateUuid';
import { GraphqlServerContext } from '../../../../context';
import { assertMutationResult } from '../../../../../test/assertMutationResult';
import {
  InviteProjectMemberSuccessResult,
  ProjectMemberRole,
} from '../../../../generated/resolversTypes';
import { inviteProjectMember } from '.';
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

describe('inviteProjectMember', async () => {
  const id = generateUuid();
  const subject = async () => {
    return await inviteProjectMember(
      {},
      {
        input: {
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
    expect(response.__typename).to.eq('InviteProjectMemberSuccessResult');
    assertMutationResult<InviteProjectMemberSuccessResult>(response);
    expect(response.result).toBeUndefined();
  });
});
