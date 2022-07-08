export * from './base';
import type { AccountRepository } from './accountRepository';
import type { StoryRepository } from './storyRepository';
import type { ProjectRepository } from './projectRepository';
import type { UserRepository } from './userRepository';

export interface Aggregates {
  story: StoryRepository;
  project: ProjectRepository;
  account: AccountRepository;
  user: UserRepository;
}
