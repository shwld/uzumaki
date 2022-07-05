export * from './base';
import type { AccountRepository } from './accountRepository';
import type { ProjectRepository } from './projectRepository';
import type { UserRepository } from './userRepository';

export interface Aggregates {
  project: ProjectRepository;
  account: AccountRepository;
  user: UserRepository;
}
