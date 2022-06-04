import { User } from '@prisma/client';
import { UserEntity, UserEntityProperties, UserRepository } from 'core-domain';
import { db } from '../lib/db';

/**
 * Mappers
 */
const mapper = (user: User) =>
  new UserEntity({
    id: user.id,
    name: user.name,
    email: user.email,
    picture: user.picture,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
const nullableMapper = (user: User | null | undefined) =>
  user != null ? mapper(user) : undefined;

/**
 * Repositories
 */
export const userRepository: UserRepository = {
  findMany() {
    return db.user.findMany().then((users) => users.map(mapper));
  },
  findById(id: string) {
    return db.user.findUnique({ where: { id } }).then(nullableMapper);
  },
  create(user: UserEntityProperties) {
    return db.user.create({ data: user }).then(mapper);
  },
  update(id: string, user: UserEntityProperties) {
    return db.user.update({ data: user, where: { id } }).then(mapper);
  },
  delete(id: string) {
    return db.user.delete({ where: { id } }).then(mapper);
  },
};
