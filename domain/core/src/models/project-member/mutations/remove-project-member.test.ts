import { describe, expect, test } from 'vitest';
import { generateId } from '../../../lib/id';
import { ProjectMemberMutations } from '.';
import { ProjectMember_Attributes } from '../project-member-interfaces';
import { STATE_IS_REMOVING } from '../../../lib/interfaces';

describe('remove new project', async () => {
  const record: ProjectMember_Attributes = {
    id: generateId(),
    projectId: generateId(),
    userId: generateId(),
    role: 'OWNER',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      id: generateId(),
      name: 'test user',
      avatarImageUrl: 'https://example.com/image.png',
    },
  };

  test('can remove', async () => {
    const newProjectMember = ProjectMemberMutations.remove(record);
    expect(newProjectMember.__state).toBe(STATE_IS_REMOVING);
  });
});
