import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { ProjectEntity } from './entity';

describe('initialize', async () => {
  const project = new ProjectEntity({
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'test name',
    description: 'test description',
    privacy: 'PRIVATE',
    currentVelocity: 10,
    accountId: generateId(),
  });

  test('property is correct', async () => {
    expect(project.name).eq('test name');
  });
});
