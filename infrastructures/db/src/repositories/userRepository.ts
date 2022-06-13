import { User } from '@prisma/client';
import { UserEntity } from 'core-domain';
import type { UserEntityProperties, UserRepository } from 'core-domain';
import { db } from '../lib/db';

/**
 * Mappers
 */
const mapToUserEntity = (user: User) =>
  new UserEntity({
    id: user.id,
    name: user.name,
    email: user.email,
    picture: user.picture,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
const mapToUserEntityOrDefault = (user: User | null | undefined) =>
  user != null ? mapToUserEntity(user) : undefined;
const mapFromEntity = (item: UserEntity): UserEntityProperties => ({
  name: item.name,
  email: item.email,
  picture: item.picture,
});

/**
 * Repositories
 */
export const userRepository: UserRepository = {
  create(data) {
    return db.user
      .create({ data: { id: data.id, ...mapFromEntity(data) } })
      .then(mapToUserEntity);
  },
  update(user) {
    return db.user
      .update({ data: mapFromEntity(user), where: { id: user.id } })
      .then(mapToUserEntity);
  },
  destroy(user) {
    return db.user.delete({ where: { id: user.id } }).then(mapToUserEntity);
  },
  async find({ id }) {
    const item = await db.user.findUnique({ where: { id } });
    assertRecordPresent(item);

    return mapToUserEntity(item);
  },
  findBy({ id }) {
    return db.user.findUnique({ where: { id } }).then(mapToUserEntityOrDefault);
  },
};
