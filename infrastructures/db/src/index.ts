import { Aggregates } from 'core-domain';
import { ProjectRepository } from './repositories/project';
import { projectMemberInvitationRepository } from './repositories/projectMemberInvitationRepository';
import { projectMemberRepository } from './repositories/projectMemberRepository';
import { storyRepository } from './repositories/storyRepository';
import { AccountRepository } from './repositories/account';
import { userRepository } from './repositories/userRepository';

export const db: Aggregates = {
  project: ProjectRepository,
  projectMemberInvitation: projectMemberInvitationRepository,
  projectMember: projectMemberRepository,
  story: storyRepository,
  account: AccountRepository,
  user: userRepository,
};
