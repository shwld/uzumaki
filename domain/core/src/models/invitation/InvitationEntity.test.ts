import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { InvitationEntity } from './InvitationEntity';

describe('initialize', async () => {
  const invitation = new InvitationEntity({
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
