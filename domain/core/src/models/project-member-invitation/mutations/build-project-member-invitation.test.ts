import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { Either } from '../../../shared/result';
import { ProjectMemberInvitationMutations } from '.';
import { ProjectMemberInvitation_BuildInput } from './build-project-member-invitation';

describe('build new user', async () => {
  const validInput: ProjectMemberInvitation_BuildInput = {
    id: generateId(),
    projectId: generateId(),
    role: 'OWNER',
    email: 'test@example.com',
  };

  describe('case: valid input', async () => {
    test('can build', async () => {
      const build = ProjectMemberInvitationMutations.build(validInput);
      const newProjectMemberInvitation = await build();
      expect(Either.isRight(newProjectMemberInvitation)).toBe(true);
      expect(
        Either.isRight(newProjectMemberInvitation) &&
          newProjectMemberInvitation.right.role
      ).eq('OWNER');
    });
  });

  describe('case: invalid input', async () => {
    test('can not build', async () => {
      const invalidInput: ProjectMemberInvitation_BuildInput = {
        ...validInput,
        id: '',
      };
      const build = ProjectMemberInvitationMutations.build(invalidInput);
      const newProjectMemberInvitation = await build();
      expect(Either.isLeft(newProjectMemberInvitation)).toBe(true);
      expect(
        Either.isLeft(newProjectMemberInvitation) &&
          newProjectMemberInvitation.left.message
      ).toContain('Validation Error');
    });
  });
});
