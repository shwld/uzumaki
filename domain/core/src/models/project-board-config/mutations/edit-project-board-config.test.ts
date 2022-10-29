import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { Either } from '../../../shared/result';
import { ProjectBoardConfigMutations } from '.';
import { ProjectBoardConfig_EditInput } from './edit-project-board-config';
import { ProjectBoardConfig_Attributes } from '../project-board-config-interfaces';

describe('edit new project', async () => {
  const record: ProjectBoardConfig_Attributes = {
    id: generateId(),
    initialVelocity: 10,
    startOn: null,
    startIterationOn: 'MONDAY',
    iterationLength: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const validInput: ProjectBoardConfig_EditInput = {
    initialVelocity: 15,
  };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const edit = ProjectBoardConfigMutations.edit(validInput);
      const newProjectBoardConfig = await edit(record)();
      expect(Either.isRight(newProjectBoardConfig)).toBe(true);
      expect(
        Either.isRight(newProjectBoardConfig) &&
          newProjectBoardConfig.right.initialVelocity
      ).eq(15);
    });
  });

  describe('case: invalid input', async () => {
    test('can not edit', async () => {
      const invalidInput: ProjectBoardConfig_EditInput = {
        ...validInput,
        initialVelocity: -1,
      };
      const edit = ProjectBoardConfigMutations.edit(invalidInput);
      const newProjectBoardConfig = await edit(record)();
      expect(Either.isLeft(newProjectBoardConfig)).toBe(true);
      expect(
        Either.isLeft(newProjectBoardConfig) &&
          newProjectBoardConfig.left.message
      ).toContain('Validation Error');
    });
  });
});
