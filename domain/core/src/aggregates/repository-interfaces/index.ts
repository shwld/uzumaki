export * from './base';
import type { AccountRepository } from './account-repository';
import type { ProjectMemberInvitationRepository } from './project-member-invitation-repository';
import type { ProjectMemberRepository } from './project-member-repository';
import type { StoryRepository } from './story-repository';
import type { ProjectRepository } from './project-repository';
import type { UserRepository } from './user-repository';

export interface Aggregates {
  projectMemberInvitation: ProjectMemberInvitationRepository;
  projectMember: ProjectMemberRepository;
  story: StoryRepository;
  project: ProjectRepository;
  account: AccountRepository;
  user: UserRepository;
}
