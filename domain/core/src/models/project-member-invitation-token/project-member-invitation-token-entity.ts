import { EntityState } from '../../shared';
import type {
  ProjectMemberInvitationToken_ExpiredAttributes,
  ProjectMemberInvitationToken_InvitingAttributes,
  ProjectMemberInvitationToken_JoinedAttributes,
} from './project-member-invitation-token-interfaces';

type ProjectMemberInvitationTokenInvitingEntity =
  ProjectMemberInvitationToken_InvitingAttributes & EntityState & {};
export function ProjectMemberInvitationTokenInvitingEntity(
  item: ProjectMemberInvitationToken_InvitingAttributes
): ProjectMemberInvitationTokenInvitingEntity {
  return {
    ...item,
    __state: 'Entity',
  };
}

type ProjectMemberInvitationTokenJoinedEntity =
  ProjectMemberInvitationToken_JoinedAttributes & EntityState & {};
export function ProjectMemberInvitationTokenJoinedEntity(
  item: ProjectMemberInvitationToken_JoinedAttributes
): ProjectMemberInvitationTokenJoinedEntity {
  return {
    ...item,
    __state: 'Entity',
  };
}

type ProjectMemberInvitationTokenExpiredEntity =
  ProjectMemberInvitationToken_ExpiredAttributes & EntityState & {};
export function ProjectMemberInvitationTokenExpiredEntity(
  item: ProjectMemberInvitationToken_ExpiredAttributes
): ProjectMemberInvitationTokenExpiredEntity {
  return {
    ...item,
    __state: 'Entity',
  };
}

export type ProjectMemberInvitationTokenEntity =
  | ProjectMemberInvitationTokenInvitingEntity
  | ProjectMemberInvitationTokenJoinedEntity
  | ProjectMemberInvitationTokenExpiredEntity;
