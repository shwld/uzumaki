import { UserEntity } from '../entities/user';

export interface UserRepository {
  findMany(): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity | undefined>;
}
