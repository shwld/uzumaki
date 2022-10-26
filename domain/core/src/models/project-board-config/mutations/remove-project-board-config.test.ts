import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/entity';
import { ProjectBoardConfigMutations } from '.';
import { ProjectBoardConfig_Attributes } from '../project-board-config-interfaces';
import { STATE_IS_REMOVING } from '../../../shared/interfaces';

describe('remove new project', async () => {
  const record: ProjectBoardConfig_Attributes = {
    id: generateId(),
    initialVelocity: 10,
    startOn: null,
    startIterationOn: 'MONDAY',
    iterationLength: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test('can remove', async () => {
    const newProjectBoardConfig = ProjectBoardConfigMutations.remove(record);
    expect(newProjectBoardConfig.__state).toBe(STATE_IS_REMOVING);
  });
});
