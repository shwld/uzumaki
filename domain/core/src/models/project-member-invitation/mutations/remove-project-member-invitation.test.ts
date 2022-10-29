import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { ProjectMemberInvitationMutations } from '.';
import { ProjectMemberInvitation_Attributes } from '../project-member-invitation-interfaces';
import { STATE_IS_REMOVING } from '../../../shared/interfaces';

describe('remove new project', async () => {
  const record: ProjectMemberInvitation_Attributes = {
    id: generateId(),
    projectId: generateId(),
    role: 'OWNER',
    membershipId: null,
    email: 'test@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test('can remove', async () => {
    const newProjectMemberInvitation =
      ProjectMemberInvitationMutations.remove(record);
    expect(newProjectMemberInvitation.__state).toBe(STATE_IS_REMOVING);
  });
});
