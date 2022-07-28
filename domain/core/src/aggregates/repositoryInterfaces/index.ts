export * from './base';
import type { AccountRepository } from './AccountRepository';
import type { ProjectInvitationRepository } from './ProjectInvitationRepository';
import type { ProjectMemberRepository } from './ProjectMemberRepository';
import type { StoryRepository } from './StoryRepository';
import type { ProjectRepository } from './ProjectRepository';
import type { UserRepository } from './UserRepository';

export interface Aggregates {
  projectInvitation: ProjectInvitationRepository;
  projectMember: ProjectMemberRepository;
  story: StoryRepository;
  project: ProjectRepository;
  account: AccountRepository;
  user: UserRepository;
}
