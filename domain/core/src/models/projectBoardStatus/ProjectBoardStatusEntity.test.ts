import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { ProjectBoardStatusEntity } from './ProjectBoardStatusEntity';

describe('initialize', async () => {
  const projectBoardStatus = new ProjectBoardStatusEntity({
    id: generateId(),
    velocity: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  });

  test('property is correct', async () => {
    expect(projectBoardStatus.velocity).eq(10);
  });
});
