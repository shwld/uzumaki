import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/entity';
import { Either } from '../../../shared/functional';
import { ProjectBoardStatusMutations } from '.';
import { ProjectBoardStatus_BuildInput } from './build-project-board-status';

describe('build new status', async () => {
  const validInput: ProjectBoardStatus_BuildInput = {
    id: generateId(),
    velocity: 10,
  };

  describe('case: valid input', async () => {
    test('can build', async () => {
      const build = ProjectBoardStatusMutations.build(validInput);
      const newProjectBoardStatus = await build();
      expect(Either.isRight(newProjectBoardStatus)).toBe(true);
      expect(
        Either.isRight(newProjectBoardStatus) &&
          newProjectBoardStatus.right.velocity
      ).eq(10);
    });
  });

  describe('case: invalid input', async () => {
    test('can not build', async () => {
      const invalidInput: ProjectBoardStatus_BuildInput = {
        ...validInput,
        id: '',
      };
      const build = ProjectBoardStatusMutations.build(invalidInput);
      const newProjectBoardStatus = await build();
      expect(Either.isLeft(newProjectBoardStatus)).toBe(true);
      expect(
        Either.isLeft(newProjectBoardStatus) &&
          newProjectBoardStatus.left.message
      ).toContain('Validation Error');
    });
  });
});
