import { EntityState } from '../../shared';
import type { User_Attributes } from './user-interfaces';

export type UserEntity = User_Attributes & EntityState & {};

export function UserEntity(item: User_Attributes): UserEntity {
  return {
    ...item,
    __state: 'Entity',
  };
}
