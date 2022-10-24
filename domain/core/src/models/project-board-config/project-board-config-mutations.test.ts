import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { pipe, Either } from '../../shared/functional';
import { ProjectBoardConfigEntity } from './project-board-config-entity';
import { ProjectBoardConfig_Record } from './project-board-config-interfaces';
import { ProjectBoardConfigMutations } from './project-board-config-mutations';

describe('edit', async () => {
  const record: ProjectBoardConfig_Record = {
    id: generateId(),
    initialVelocity: 10,
    startOn: null,
    startIterationOn: 'MONDAY',
    iterationLength: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const projectBoardConfig = ProjectBoardConfigEntity.fromRecord(record);
      expect(projectBoardConfig.initialVelocity).eq(10);
      const edit = ProjectBoardConfigMutations.edit({
        __state: 'Unvalidated',
        initialVelocity: 15,
      })(projectBoardConfig);
      const newProjectBoardConfig = await edit();
      expect(Either.isRight(newProjectBoardConfig)).toBe(true);
      expect(
        pipe(
          newProjectBoardConfig,
          Either.match(
            a => a.message,
            a => a.initialVelocity.toString()
          )
        )
      ).toEqual('15');
    });
  });

  describe('case: invalid input', async () => {
    test('can not edit', async () => {
      const projectBoardConfig = ProjectBoardConfigEntity.fromRecord(record);
      expect(projectBoardConfig.initialVelocity).eq(10);
      const edit = ProjectBoardConfigMutations.edit({
        __state: 'Unvalidated',
        initialVelocity: -1,
      })(projectBoardConfig);
      const newProjectBoardConfig = await edit();
      expect(Either.isLeft(newProjectBoardConfig)).toBe(true);
      expect(
        pipe(
          newProjectBoardConfig,
          Either.match(
            a => a.message,
            a => a.initialVelocity.toString()
          )
        )
      ).toContain('Validation Error');
    });
  });
});
