import { Aggregates } from 'core-domain';
import { projectRepository } from './repositories/projectRepository';
import { accountRepository } from './repositories/accountRepository';
import { userRepository } from './repositories/userRepository';

export const db: Aggregates = {
  project: projectRepository,
  account: accountRepository,
  user: userRepository,
};
