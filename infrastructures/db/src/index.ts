import { Aggregates } from 'core-domain';
import { StoryRepository } from './repositories/story';
import { UserRepository } from './repositories/user';
import { ProjectMemberRepository } from './repositories/project-member';
import { ProjectMemberInvitationTokenRepository } from './repositories/project-member-invitation-token';
import { ProjectMemberInvitationRepository } from './repositories/project-member-invitation';
import { ProjectRepository } from './repositories/project';
import { AccountRepository } from './repositories/account';

export const db: Aggregates = {
  account: AccountRepository,
  story: StoryRepository,
  user: UserRepository,
  projectMember: ProjectMemberRepository,
  projectMemberInvitationToken: ProjectMemberInvitationTokenRepository,
  projectMemberInvitation: ProjectMemberInvitationRepository,
  project: ProjectRepository,
};
