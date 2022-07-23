import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { ProjectMemberEntity } from './ProjectMemberEntity';

describe('initialize', async () => {
  const ProjectMember = new ProjectMemberEntity({
    userId: generateId(),
    projectId: generateId(),
    role: 'MEMBER',
    name: 'test',
    avatarImageUrl: 'https://example.com/image.png',
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  });

  test('property is correct', async () => {
    expect(ProjectMember.name).eq('test');
  });
});
