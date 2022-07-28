import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { ProjectInvitationEntity } from './ProjectInvitationEntity';

describe('initialize', async () => {
  const invitation = new ProjectInvitationEntity({
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,

    email: 'test@example.com',
    role: 'MEMBER',
    projectId: generateId(),
    membershipId: undefined,
  });

  test('property is correct', async () => {
    expect(invitation.email).eq('test@example.com');
  });
});
