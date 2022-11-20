import { EntityState } from '../../shared';
import type { UserProfile_Attributes } from './user-profile-interfaces';

export type UserProfileEntity = UserProfile_Attributes & EntityState & {};

export function UserProfileEntity(item: UserProfile_Attributes): UserProfileEntity {
  return {
    ...item,
    __state: 'Entity',
  };
}
