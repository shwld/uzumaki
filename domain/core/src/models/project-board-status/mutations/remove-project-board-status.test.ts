import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/entity';
import { ProjectBoardStatusMutations } from '.';
import { ProjectBoardStatus_Attributes } from '../project-board-status-interfaces';
import { STATE_IS_REMOVING } from '../../../shared/interfaces';

describe('remove new project', async () => {
  const record: ProjectBoardStatus_Attributes = {
    id: generateId(),
    velocity: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test('can remove', async () => {
    const newProjectBoardStatus = ProjectBoardStatusMutations.remove(record);
    expect(newProjectBoardStatus.__state).toBe(STATE_IS_REMOVING);
  });
});
