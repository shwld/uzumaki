import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { Either } from '../../../shared/result';
import { ProjectMemberMutations } from '.';
import { ProjectMember_BuildInput } from './build-project-member';
import { ProjectMemberUser_Attributes } from '../project-member-interfaces';

describe('build new user', async () => {
  const validInput: ProjectMember_BuildInput = {
    id: generateId(),
    projectId: generateId(),
    role: 'OWNER',
    createdByInvitationId: generateId(),
  };
  const user: ProjectMemberUser_Attributes = {
    id: generateId(),
    name: 'test user',
    avatarImageUrl: 'https://example.com/image.png',
  };

  describe('case: valid input', async () => {
    test('can build', async () => {
      const build = ProjectMemberMutations.build(validInput);
      const newProjectMember = await build(user)();
      expect(Either.isRight(newProjectMember)).toBe(true);
      expect(
        Either.isRight(newProjectMember) && newProjectMember.right.role
      ).eq('OWNER');
    });
  });

  describe('case: invalid input', async () => {
    test('can not build', async () => {
      const invalidInput: ProjectMember_BuildInput = {
        ...validInput,
        id: '',
      };
      const build = ProjectMemberMutations.build(invalidInput);
      const newProjectMember = await build(user)();
      expect(Either.isLeft(newProjectMember)).toBe(true);
      expect(
        Either.isLeft(newProjectMember) && newProjectMember.left.message
      ).toContain('Validation Error');
    });
  });
});
