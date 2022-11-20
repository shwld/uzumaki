import type {
  User_BuiltAttributes,
  UserProfile_DraftAttributes,
  User_RemoveAttributes,
  UserEntity,
} from '../../models';
import { RuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface UserRepository
  extends Omit<Repository<UserEntity>, 'findMany'> {
  findByUid: (args: { uid: string }) => Result<RuntimeError, UserEntity | null>;
  findByEmail: (args: {
    email: string;
  }) => Result<RuntimeError, UserEntity | null>;
  create(attributes: User_BuiltAttributes): Result<RuntimeError, UserEntity>;
  update(
    attributes: UserProfile_DraftAttributes
  ): Result<RuntimeError, UserEntity>;
  destroy(attributes: User_RemoveAttributes): Result<RuntimeError, UserEntity>;
}
