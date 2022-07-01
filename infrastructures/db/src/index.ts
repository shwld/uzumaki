import { Aggregates } from 'core-domain';
import { accountRepository } from './repositories/accountRepository';
import { userRepository } from './repositories/userRepository';

export const db: Aggregates = {
  account: accountRepository,
  user: userRepository,
};
