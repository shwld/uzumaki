import type { User } from '@prisma/client';
import { UserEntity } from 'core-domain';

export const convertToEntity = (record: User): UserEntity => {
  return UserEntity(record);
};
