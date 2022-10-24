import type { User_Attributes, User_Record } from './user-interfaces';

const fromRecord = (record: User_Record): User_Attributes => {
  return {
    __state: 'Validated',
    ...record,
  };
};

export type UserEntity = User_Attributes & {};

export function UserEntity(item: User_Attributes): UserEntity {
  return {
    ...item,
  };
}

UserEntity.fromRecord = fromRecord;
