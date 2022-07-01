export * from './base';
import type { TodoRepository } from './todoRepository';
import type { AccountRepository } from './accountRepository';
import type { UserRepository } from './userRepository';

export interface Aggregates {
  account: AccountRepository;
  user: UserRepository;
  todo: TodoRepository;
}
