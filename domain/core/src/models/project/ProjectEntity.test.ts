import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { ProjectBoardConfigEntity } from '../projectBoardConfig';
import { ProjectBoardStatusEntity } from '../projectBoardStatus';
import { ProjectEntity } from './ProjectEntity';

describe('initialize', async () => {
  const boardConfigId = generateId();
  const boardStatusId = generateId();
  const project = new ProjectEntity({
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'test name',
    description: 'test description',
    privacy: 'PRIVATE',
    accountId: generateId(),
    boardConfigId,
    boardConfig: new ProjectBoardConfigEntity({
      id: boardConfigId,
      createdAt: new Date(),
      updatedAt: new Date(),

      initialVelocity: 10,
      startOn: new Date(),
      startIterationOn: 'MONDAY',
      iterationLength: 2,
    }),
    boardStatusId,
    boardStatus: new ProjectBoardStatusEntity({
      id: generateId(),
      velocity: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    }),
  });

  test('property is correct', async () => {
    expect(project.name).eq('test name');
  });
});
