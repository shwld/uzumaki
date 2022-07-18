import { User } from '@prisma/client';
import { UserEntity } from 'core-domain';
import type { UpdatableUserEntityFields, Aggregates } from 'core-domain';
import { db } from '../lib/db';

/**
 * Mappers
 */
const mapToUserEntity = (user: User) =>
  new UserEntity({
    id: user.id,
    name: user.name,
    email: user.email,
    avatarImageUrl: user.avatarImageUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
const mapToUserEntityOrDefault = (user: User | null | undefined) =>
  user != null ? mapToUserEntity(user) : undefined;
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
    const user = await db.user.findUnique({ where: { id: item.id } });
    if (user == null) {
      return db.user
        .create({ data: { id: item.id, ...mapFromEntity(item) } })
        .then(mapToUserEntity);
    } else if (item.isDeleted) {
      return db.user.delete({ where: { id: item.id } }).then(mapToUserEntity);
    } else {
      return db.user
        .update({ data: mapFromEntity(item), where: { id: item.id } })
        .then(mapToUserEntity);
    }
  },
  findBy({ id }) {
    return db.user.findUnique({ where: { id } }).then(mapToUserEntityOrDefault);
  },
  projectMembers(args) {
    const project = db.project.findUnique({ where: { id: args.project.id } });
    const accountMembers = project
      .account()
      .accountMemberships({ include: { user: true } })
      .then((memberships) =>
        memberships.map((membership) => mapToUserEntity(membership.user))
      );
    const projectMembers = project
      .unaccountedMembers()
      .then((members) => members.map(mapToUserEntity));

    const members = Promise.all([accountMembers, projectMembers]).then(
      (result) => result.flat()
    );
    return members;
  },
};
