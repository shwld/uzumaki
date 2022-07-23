export * from './base';
import type { AccountRepository } from './AccountRepository';
import type { ProjectUserRepository } from './ProjectUserRepository';
import type { StoryRepository } from './StoryRepository';
import type { ProjectRepository } from './ProjectRepository';
import type { UserRepository } from './UserRepository';

export interface Aggregates {
  projectUser: ProjectUserRepository;
  story: StoryRepository;
  project: ProjectRepository;
  account: AccountRepository;
  user: UserRepository;
}
