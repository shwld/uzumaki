import { UserEntity, UserEntityProperties } from '../entities/user';

interface Repository<T, U extends {}> {
  findById(id: string): Promise<T | undefined>;
  create(item: U): Promise<T>;
  update(id: string, item: U): Promise<T>;
  delete(id: string): Promise<T>;
}

export interface UserRepository
  extends Repository<UserEntity, UserEntityProperties> {
  findMany(findManyArgs?: {}): Promise<UserEntity[]>;
  findOrCreate(id: string, item: UserEntityProperties): Promise<UserEntity>;
}

export interface Aggregates {
  user: UserRepository;
}
