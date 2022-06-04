import { TodoEntity } from '../entities/todo';
import { UserEntity } from '../entities/user';

interface Repository<T, U> {
  create(item: T): Promise<T>;
  update(item: T): Promise<T>;
  destroy(item: T): Promise<T>;
  findBy(
    args: { id: string } & (U extends {} ? U : {})
  ): Promise<T | undefined>;
  findMany(args: U): Promise<T[]>;
}

export interface UserRepository
  extends Omit<Repository<UserEntity, undefined>, 'findMany'> {}

export interface TodoRepository
  extends Repository<TodoEntity, { user: UserEntity }> {}

export interface Aggregates {
  user: UserRepository;
  todo: TodoRepository;
}
