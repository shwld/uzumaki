import type {
  User_BuiltAttributes,
  User_DraftAttributes,
  User_RemoveAttributes,
  UserEntity,
} from '../../models';
import { RepositoryRuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface UserRepository
  extends Omit<Repository<UserEntity>, 'findMany'> {
  findByUid: (args: {
    uid: string;
  }) => Result<RepositoryRuntimeError, UserEntity | null>;
  findByEmail: (args: {
    email: string;
  }) => Result<RepositoryRuntimeError, UserEntity | null>;
  create(
    attributes: User_BuiltAttributes
  ): Result<RepositoryRuntimeError, UserEntity>;
  update(
    attributes: User_DraftAttributes
  ): Result<RepositoryRuntimeError, UserEntity>;
  destroy(
    attributes: User_RemoveAttributes
  ): Result<RepositoryRuntimeError, UserEntity>;
}
