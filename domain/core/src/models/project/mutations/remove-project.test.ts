import { describe, expect, test } from 'vitest';
import { generateId } from '../../../lib/id';
import { ProjectMutations } from '.';
import { Project_Attributes } from '../project-interfaces';
import { STATE_IS_REMOVING } from '../../../lib/interfaces';

describe('remove new project', async () => {
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

  test('can remove', async () => {
    const newProject = ProjectMutations.remove(record);
    expect(newProject.__state).toBe(STATE_IS_REMOVING);
  });
});
