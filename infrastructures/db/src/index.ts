import { Aggregates } from 'core-domain';
import { projectMemberInvitationRepository } from './repositories/projectMemberInvitationRepository';
import { projectMemberRepository } from './repositories/projectMemberRepository';
import { storyRepository } from './repositories/storyRepository';
import { projectRepository } from './repositories/projectRepository';
import { AccountRepository } from './repositories/account';
import { userRepository } from './repositories/userRepository';

export const db: Aggregates = {
  projectMemberInvitation: projectMemberInvitationRepository,
  projectMember: projectMemberRepository,
  story: storyRepository,
  project: projectRepository,
  account: AccountRepository,
  user: userRepository,
};
