import { Aggregates } from 'core-domain';
import { StoryRepository } from './repositories/story';
import { UserRepository } from './repositories/user';
import { ProjectMemberRepository } from './repositories/project-member';
import { ProjectMemberInvitationTokenRepository } from './repositories/project-member-invitation-token';
import { ProjectMemberInvitationRepository } from './repositories/project-member-invitation';
import { ProjectRepository } from './repositories/project';
import { projectMemberRepository } from './repositories/projectMemberRepository';
import { storyRepository } from './repositories/storyRepository';
import { AccountRepository } from './repositories/account';
import { userRepository } from './repositories/userRepository';

export const db: Aggregates = {
  story: StoryRepository,
  user: UserRepository,
  projectMember: ProjectMemberRepository,
  projectMemberInvitationToken: ProjectMemberInvitationTokenRepository,
  projectMemberInvitation: ProjectMemberInvitationRepository,
  project: ProjectRepository,
  projectMember: projectMemberRepository,
  story: storyRepository,
  account: AccountRepository,
  user: userRepository,
};
