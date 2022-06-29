import type { TodoEntity } from '../../models/todo/entity';
import type { UserEntity } from '../../models/user/entity';
import { Repository } from './base';

export interface TodoRepository
  extends Repository<TodoEntity, { user: UserEntity }> {}
