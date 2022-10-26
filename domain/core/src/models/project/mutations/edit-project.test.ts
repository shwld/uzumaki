import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/entity';
import { Either } from '../../../shared/functional';
import { ProjectMutations } from '.';
import { Project_EditInput } from './edit-project';
import { Project_Attributes } from '../project-interfaces';

describe('edit new project', async () => {
  const record: Project_Attributes = {
    id: generateId(),
    accountId: generateId(),
    createdById: generateId(),
    name: 'test project',
    description: 'test project description',
    boardConfigId: generateId(),
    boardStatusId: generateId(),
    privacy: 'PRIVATE',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const validInput: Project_EditInput = {
    id: generateId(),
    name: 'new project',
  };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const edit = ProjectMutations.edit(validInput);
      const newProject = await edit(record)();
      expect(Either.isRight(newProject)).toBe(true);
      expect(Either.isRight(newProject) && newProject.right.name).eq(
        'new project'
      );
    });
  });

  describe('case: invalid input', async () => {
    test('can not edit', async () => {
      const invalidInput: Project_EditInput = {
        ...validInput,
        id: '',
      };
      const edit = ProjectMutations.edit(invalidInput);
      const newProject = await edit(record)();
      expect(Either.isLeft(newProject)).toBe(true);
      expect(Either.isLeft(newProject) && newProject.left.message).toContain(
        'Validation Error'
      );
    });
  });
});
