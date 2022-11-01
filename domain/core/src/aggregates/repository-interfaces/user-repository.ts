import type {
  User_BuiltAttributes,
  User_DraftAttributes,
  User_RemoveAttributes,
  User_ValidAttributes,
} from '../../models';
import { RepositoryRuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface UserRepository
  extends Omit<Repository<User_ValidAttributes>, 'findMany'> {
  findByUid: (args: {
    uid: string;
  }) => Result<RepositoryRuntimeError, User_ValidAttributes | null>;
  findByEmail: (args: {
    email: string;
  }) => Result<RepositoryRuntimeError, User_ValidAttributes | null>;
  create(
    attributes: User_BuiltAttributes
  ): Result<RepositoryRuntimeError, User_ValidAttributes>;
  update(
    attributes: User_DraftAttributes
  ): Result<RepositoryRuntimeError, User_ValidAttributes>;
  destroy(
    attributes: User_RemoveAttributes
  ): Result<RepositoryRuntimeError, User_ValidAttributes>;
}
