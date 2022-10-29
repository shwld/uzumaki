import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { Either } from '../../../shared/result';
import { ProjectMutations } from '.';
import { Project_BuildInput } from './build-project';

describe('build new user', async () => {
  const validInput: Project_BuildInput = {
    id: generateId(),
    accountId: generateId(),
    createdById: generateId(),
    name: 'test project',
    description: 'test project description',
    privacy: 'PRIVATE',
  };

  describe('case: valid input', async () => {
    test('can build', async () => {
      const build = ProjectMutations.build(validInput);
      const newProject = await build();
      expect(Either.isRight(newProject)).toBe(true);
      expect(Either.isRight(newProject) && newProject.right.name).eq(
        'test project'
      );
    });
  });

  describe('case: invalid input', async () => {
    test('can not build', async () => {
      const invalidInput: Project_BuildInput = {
        ...validInput,
        id: '',
      };
      const build = ProjectMutations.build(invalidInput);
      const newProject = await build();
      expect(Either.isLeft(newProject)).toBe(true);
      expect(Either.isLeft(newProject) && newProject.left.message).toContain(
        'Validation Error'
      );
    });
  });
});
