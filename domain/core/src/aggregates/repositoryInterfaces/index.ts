export * from './base';
import type { AccountRepository } from './AccountRepository';
import type { ProjectMemberRepository } from './ProjectMemberRepository';
import type { StoryRepository } from './StoryRepository';
import type { ProjectRepository } from './ProjectRepository';
import type { UserRepository } from './UserRepository';

export interface Aggregates {
  projectMember: ProjectMemberRepository;
  story: StoryRepository;
  project: ProjectRepository;
  account: AccountRepository;
  user: UserRepository;
}
