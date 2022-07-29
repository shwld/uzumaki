import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { ProjectMemberInvitationEntity } from '../projectMemberInvitation';
import { ProjectMemberInvitationTokenEntity } from './ProjectMemberInvitationTokenEntity';

describe('initialize', async () => {
  const invitation = new ProjectMemberInvitationEntity({
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,

    email: 'test@example.com',
    role: 'MEMBER',
    projectId: generateId(),
    membershipId: undefined,
  });
  const projectMemberInvitationToken = new ProjectMemberInvitationTokenEntity({
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    expiredAt: new Date(),
    invitation,
  });

  test('property is correct', async () => {
    expect(projectMemberInvitationToken.invitation.role).eq('MEMBER');
  });
});
