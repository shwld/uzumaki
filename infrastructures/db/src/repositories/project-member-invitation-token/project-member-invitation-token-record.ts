import type {
  ProjectMemberInvitation,
  ProjectMemberInvitationToken,
} from '@prisma/client';
import {
  ProjectMemberInvitationTokenEntity,
  ProjectMemberInvitationTokenExpiredEntity,
  ProjectMemberInvitationTokenInvitingEntity,
  ProjectMemberInvitationTokenJoinedEntity,
} from 'core-domain';
import { patternMatch, P } from 'core-domain/lib';

export const convertToEntity = (
  record: ProjectMemberInvitationToken & { invitation: ProjectMemberInvitation }
): ProjectMemberInvitationTokenEntity => {
  const entity = patternMatch(record)
    .with(
      { invitation: { membershipId: P.not(P.nullish) } },
      ({ invitation, ...columns }) =>
        ProjectMemberInvitationTokenJoinedEntity({
          ...columns,
          projectId: invitation.projectId,
          role: invitation.role,
          email: invitation.email,
          state: 'JOINED',
        })
    )
    .with(
      { expiredAt: P.when(v => v < new Date()) },
      ({ invitation, ...columns }) =>
        ProjectMemberInvitationTokenExpiredEntity({
          ...columns,
          projectId: invitation.projectId,
          role: invitation.role,
          email: invitation.email,
          state: 'EXPIRED',
        })
    )
    .with(
      { invitation: { membershipId: P.nullish } },
      ({ invitation, ...columns }) =>
        ProjectMemberInvitationTokenInvitingEntity({
          ...columns,
          projectId: invitation.projectId,
          role: invitation.role,
          email: invitation.email,
          state: 'INVITING',
        })
    )
    .exhaustive();

  return entity;
};
