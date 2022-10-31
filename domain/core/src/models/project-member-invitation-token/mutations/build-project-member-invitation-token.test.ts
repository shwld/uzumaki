import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { Either } from '../../../shared/result';
import { ProjectMemberInvitationTokenMutations } from '.';
import { ProjectMemberInvitationToken_BuildInput } from './build-project-member-invitation-token';

describe('build new user', async () => {
  const validInput: ProjectMemberInvitationToken_BuildInput = {
    invitation: {
      __state: 'Validated',
      id: generateId(),
      projectId: generateId(),
      role: 'OWNER',
      email: 'test@example.com',
      membershipId: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  test('can build', async () => {
    const build = ProjectMemberInvitationTokenMutations.build(validInput);
    const newProjectMemberInvitationToken = await build();
    expect(Either.isRight(newProjectMemberInvitationToken)).toBe(true);
    expect(
      Either.isRight(newProjectMemberInvitationToken) &&
        newProjectMemberInvitationToken.right.invitationId
    ).eq(validInput.invitation.id);
  });
});
