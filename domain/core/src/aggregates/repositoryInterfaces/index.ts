import type { TodoRepository } from './todoRepository';
import type { UserRepository } from './userRepository';

export interface Aggregates {
  user: UserRepository;
  todo: TodoRepository;
}
