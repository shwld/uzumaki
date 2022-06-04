import { Aggregates } from 'core-domain';
import { todoRepository } from './repositories/todoRepository';
import { userRepository } from './repositories/userRepository';

export const db: Aggregates = {
  user: userRepository,
  todo: todoRepository,
};
