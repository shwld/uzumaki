import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/entity';
import { Either } from '../../../shared/functional';
import { ProjectBoardConfigMutations } from '.';
import { ProjectBoardConfig_BuildInput } from './build-project-board-config';

describe('build new user', async () => {
  const validInput: ProjectBoardConfig_BuildInput = {
    id: generateId(),
    initialVelocity: 10,
    startOn: null,
    startIterationOn: 'MONDAY',
    iterationLength: 1,
  };

  describe('case: valid input', async () => {
    test('can build', async () => {
      const build = ProjectBoardConfigMutations.build(validInput);
      const newProjectBoardConfig = await build();
      expect(Either.isRight(newProjectBoardConfig)).toBe(true);
      expect(
        Either.isRight(newProjectBoardConfig) &&
          newProjectBoardConfig.right.startIterationOn
      ).eq('MONDAY');
    });
  });

  describe('case: invalid input', async () => {
    test('can not build', async () => {
      const invalidInput: ProjectBoardConfig_BuildInput = {
        ...validInput,
        id: '',
      };
      const build = ProjectBoardConfigMutations.build(invalidInput);
      const newProjectBoardConfig = await build();
      expect(Either.isLeft(newProjectBoardConfig)).toBe(true);
      expect(
        Either.isLeft(newProjectBoardConfig) &&
          newProjectBoardConfig.left.message
      ).toContain('Validation Error');
    });
  });
});
