import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { pipe, Either } from '../../shared/functional';
import { ProjectBoardStatusEntity } from './project-board-status-entity';
import { ProjectBoardStatus_Record } from './project-board-status-interfaces';
import { ProjectBoardStatusMutations } from './project-board-status-mutations';

describe('edit', async () => {
  const record: ProjectBoardStatus_Record = {
    id: generateId(),
    velocity: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const projectBoardStatus = ProjectBoardStatusEntity.fromRecord(record);
      expect(projectBoardStatus.velocity).eq(10);
      const edit = ProjectBoardStatusMutations.edit({
        __state: 'Unvalidated',
        velocity: 15,
      })(projectBoardStatus);
      const newProjectBoardStatus = await edit();
      expect(Either.isRight(newProjectBoardStatus)).toBe(true);
      expect(
        pipe(
          newProjectBoardStatus,
          Either.match(
            a => a.message,
            a => a.velocity.toString()
          )
        )
      ).toEqual('15');
    });
  });

  describe('case: invalid input', async () => {
    test('can not edit', async () => {
      const projectBoardStatus = ProjectBoardStatusEntity.fromRecord(record);
      expect(projectBoardStatus.velocity).eq(10);
      const edit = ProjectBoardStatusMutations.edit({
        __state: 'Unvalidated',
        velocity: -1,
      })(projectBoardStatus);
      const newProjectBoardStatus = await edit();
      expect(Either.isLeft(newProjectBoardStatus)).toBe(true);
      expect(
        pipe(
          newProjectBoardStatus,
          Either.match(
            a => a.message,
            a => a.velocity.toString()
          )
        )
      ).toContain('Validation Error');
    });
  });
});
