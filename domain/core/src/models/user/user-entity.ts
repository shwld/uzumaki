import type { User_Attributes } from './user-interfaces';

export type UserEntity = User_Attributes & {};

export function UserEntity(item: User_Attributes): UserEntity {
  return {
    ...item,
  };
}
