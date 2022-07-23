import { Aggregates } from 'core-domain';
import { projectUserRepository } from './repositories/projectUserRepository';
import { storyRepository } from './repositories/storyRepository';
import { projectRepository } from './repositories/projectRepository';
import { accountRepository } from './repositories/accountRepository';
import { userRepository } from './repositories/userRepository';

export const db: Aggregates = {
  projectUser: projectUserRepository,
  story: storyRepository,
  project: projectRepository,
  account: accountRepository,
  user: userRepository,
};
