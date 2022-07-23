import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { ProjectUserEntity } from './ProjectUserEntity';

describe('initialize', async () => {
  const ProjectUser = new ProjectUserEntity({
    userId: generateId(),
    projectId: generateId(),
    role: 'MEMBER',
    name: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  });

  test('property is correct', async () => {
    expect(ProjectUser.name).eq('test');
  });
});
