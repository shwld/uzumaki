import { Aggregates } from 'core-domain';
import { projectInvitationRepository } from './repositories/projectInvitationRepository';
import { projectMemberRepository } from './repositories/projectMemberRepository';
import { storyRepository } from './repositories/storyRepository';
import { projectRepository } from './repositories/projectRepository';
import { accountRepository } from './repositories/accountRepository';
import { userRepository } from './repositories/userRepository';

export const db: Aggregates = {
  projectInvitation: projectInvitationRepository,
  projectMember: projectMemberRepository,
  story: storyRepository,
  project: projectRepository,
  account: accountRepository,
  user: userRepository,
};
