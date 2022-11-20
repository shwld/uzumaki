import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { Either } from '../../../shared';
import { ProjectMemberMutations } from '.';
import { ProjectMember_BuildInput } from './build-project-member';
import { UserEntity } from '../../user';
import { UserProfileEntity } from '../../user-profile';

describe('build new user', async () => {
  const id = generateId();
  const user: UserEntity = UserEntity({
    id,
    name: 'test user',
    avatarImageUrl: 'https://example.com/image.png',
    uid: generateId(),
    email: 'test@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const validInput: ProjectMember_BuildInput = {
    id: generateId(),
    projectId: generateId(),
    role: 'OWNER',
    createdByInvitationId: generateId(),
    user,
  };

  describe('case: valid input', async () => {
    test('can build', async () => {
      const build = ProjectMemberMutations.build(validInput);
      const newProjectMember = await build();
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
      const newProjectMember = await build();
      expect(Either.isLeft(newProjectMember)).toBe(true);
      expect(
        Either.isLeft(newProjectMember) && newProjectMember.left.message
      ).toContain('Validation Error');
    });
  });
});
