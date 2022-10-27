import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/entity';
import { Either } from '../../../shared/functional';
import { ProjectMemberMutations } from '.';
import { ProjectMember_EditInput } from './edit-project-member';
import { ProjectMember_Attributes } from '../project-member-interfaces';

describe('edit new project', async () => {
  const record: ProjectMember_Attributes = {
    id: generateId(),
    projectId: generateId(),
    userId: generateId(),
    role: 'OWNER',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      id: generateId(),
      name: 'test user',
      avatarImageUrl: 'https://example.com/image.png',
    },
  };
  const validInput: ProjectMember_EditInput = {
    role: 'MEMBER',
  };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const edit = ProjectMemberMutations.edit(validInput);
      const newProjectMember = await edit(record)();
      expect(Either.isRight(newProjectMember)).toBe(true);
      expect(
        Either.isRight(newProjectMember) && newProjectMember.right.role
      ).eq('MEMBER');
    });
  });

  describe('case: invalid input', async () => {
    test('can not edit', async () => {
      const invalidInput: ProjectMember_EditInput = {
        ...validInput,
        id: '',
      };
      const edit = ProjectMemberMutations.edit(invalidInput);
      const newProjectMember = await edit(record)();
      expect(Either.isLeft(newProjectMember)).toBe(true);
      expect(
        Either.isLeft(newProjectMember) && newProjectMember.left.message
      ).toContain('Validation Error');
    });
  });
});
