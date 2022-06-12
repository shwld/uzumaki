import { TodoEntity } from '../models/todo/entity';
import { UserEntity } from '../models/user/entity';

export interface Repository<T, U> {
  create(item: T): Promise<T>;
  update(item: T): Promise<T>;
  destroy(item: T): Promise<T>;
  findBy(
    args: { id: string } & (U extends {} ? U : {})
  ): Promise<T | undefined>;
  findMany(
    args: { skip?: number; take?: number } & (U extends {} ? U : {})
  ): Promise<{ nodes: T[]; totalCount: number }>;
}

export interface UserRepository
  extends Omit<Repository<UserEntity, undefined>, 'findMany'> {}

export interface TodoRepository
  extends Repository<TodoEntity, { user: UserEntity }> {}

export interface Aggregates {
  user: UserRepository;
  todo: TodoRepository;
}
