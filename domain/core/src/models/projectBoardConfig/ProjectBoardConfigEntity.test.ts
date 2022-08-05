import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { ProjectBoardConfigEntity } from './ProjectBoardConfigEntity';

describe('initialize', async () => {
  const projectBoardConfig = new ProjectBoardConfigEntity({
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),

    initialVelocity: 10,
    startOn: new Date(),
    startIterationOn: 'MONDAY',
    iterationLength: 2,
  });

  test('property is correct', async () => {
    expect(projectBoardConfig.initialVelocity).eq(10);
  });
});
