import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/entity';
import { Either } from '../../../shared/functional';
import { ProjectBoardStatusMutations } from '.';
import { ProjectBoardStatus_EditInput } from './edit-project-board-status';
import { ProjectBoardStatus_Attributes } from '../project-board-status-interfaces';

describe('edit new status', async () => {
  const record: ProjectBoardStatus_Attributes = {
    id: generateId(),
    velocity: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const validInput: ProjectBoardStatus_EditInput = {
    velocity: 15,
  };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const edit = ProjectBoardStatusMutations.edit(validInput);
      const newProjectBoardStatus = await edit(record)();
      expect(Either.isRight(newProjectBoardStatus)).toBe(true);
      expect(
        Either.isRight(newProjectBoardStatus) &&
          newProjectBoardStatus.right.velocity
      ).eq(15);
    });
  });

  describe('case: invalid input', async () => {
    test('can not edit', async () => {
      const invalidInput: ProjectBoardStatus_EditInput = {
        ...validInput,
        velocity: -1,
      };
      const edit = ProjectBoardStatusMutations.edit(invalidInput);
      const newProjectBoardStatus = await edit(record)();
      expect(Either.isLeft(newProjectBoardStatus)).toBe(true);
      expect(
        Either.isLeft(newProjectBoardStatus) &&
          newProjectBoardStatus.left.message
      ).toContain('Validation Error');
    });
  });
});
