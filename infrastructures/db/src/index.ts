import { Aggregates } from 'core-domain';
import { userRepository } from './repositories/userRepository';

export const db: Aggregates = {
  user: userRepository,
};
