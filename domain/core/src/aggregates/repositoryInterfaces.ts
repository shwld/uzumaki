import { UserEntity } from '../entities/user';

interface Repository<T, U extends {}> {
  findMany(findManyArgs?: U): Promise<T[]>;
  findById(id: string): Promise<T | undefined>;
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<T>;
}

export type UserRepository = Repository<UserEntity, {}>;
