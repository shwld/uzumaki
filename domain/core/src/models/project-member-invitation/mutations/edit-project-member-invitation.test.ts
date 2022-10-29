import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { Either } from '../../../shared/result';
import { ProjectMemberInvitationMutations } from '.';
import type { ProjectMemberInvitation_EditInput } from '.';
import { ProjectMemberInvitation_Attributes } from '../project-member-invitation-interfaces';

describe('edit new project', async () => {
  const record: ProjectMemberInvitation_Attributes = {
    id: generateId(),
    projectId: generateId(),
    role: 'OWNER',
    membershipId: null,
    email: 'test@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const validInput: ProjectMemberInvitation_EditInput = {
    role: 'MEMBER',
  };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const edit = ProjectMemberInvitationMutations.edit(validInput);
      const newProjectMemberInvitation = await edit(record)();
      expect(Either.isRight(newProjectMemberInvitation)).toBe(true);
      expect(
        Either.isRight(newProjectMemberInvitation) &&
          newProjectMemberInvitation.right.role
      ).eq('MEMBER');
    });
  });
});
