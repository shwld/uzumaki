import { EntityState } from '../../shared';
import { UserProfileEntity } from '../user-profile';
import type { User_Attributes } from './user-interfaces';

export type UserEntity = User_Attributes &
  EntityState & {
    profile: UserProfileEntity;
  };

export function UserEntity(item: User_Attributes): UserEntity {
  return {
    ...item,
    profile: UserProfileEntity({
      id: item.id,
      name: item.name,
      avatarImageUrl: item.avatarImageUrl,
    }),
    __state: 'Entity',
  };
}
