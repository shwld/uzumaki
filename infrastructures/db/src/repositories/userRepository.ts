import { User } from '@prisma/client';
import { ProjectEntity, UserEntity } from 'core-domain';
import type { UpdatableUserEntityFields, Aggregates } from 'core-domain';
import { db } from '../lib/db';

/**
 * Mappers
 */
const mapToUserEntity = (item: User & { isDeleted?: boolean }) =>
  new UserEntity({
    id: item.id,
    uid: item.uid,
    name: item.name,
    email: item.email,
    avatarImageUrl: item.avatarImageUrl,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    isDeleted: item.isDeleted,
  });
const mapToDeletedUserEntity = (item: User): UserEntity => {
  return mapToUserEntity({ ...item, isDeleted: true });
};
const mapToUserEntityOrDefault = (item: User | null | undefined) =>
  item != null ? mapToUserEntity(item) : undefined;
const mapFromEntity = (item: UserEntity): UpdatableUserEntityFields => ({
  name: item.name,
  email: item.email,
  avatarImageUrl: item.avatarImageUrl,
});

/**
 * Repositories
 */
export const userRepository: Aggregates['user'] = {
  async save(item) {
    const user = await db.user.findUnique({ where: { uid: item.uid } });
    if (user == null) {
      return db.user
        .create({
          data: { id: item.id, uid: item.uid, ...mapFromEntity(item) },
        })
        .then(mapToUserEntity);
    } else if (item.isDeleted) {
      return db.user
        .delete({ where: { uid: item.uid } })
        .then(mapToDeletedUserEntity);
    } else {
      return db.user
        .update({ data: mapFromEntity(item), where: { uid: item.uid } })
        .then(mapToUserEntity);
    }
  },
  findBy({ id }) {
    return db.user.findUnique({ where: { id } }).then(mapToUserEntityOrDefault);
  },
  findByUid({ uid }) {
    return db.user
      .findUnique({ where: { uid } })
      .then(mapToUserEntityOrDefault);
  },
  findByEmail({ email }) {
    return db.user
      .findUnique({ where: { email } })
      .then(mapToUserEntityOrDefault);
  },
};
