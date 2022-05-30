import { User } from '@prisma/client';
import { UserEntity, UserRepository } from 'core-domain';
import { db } from '../lib/db';

/**
 * Mappers
 */
const mapper = (user: User) =>
  new UserEntity({
    id: user.id,
    name: user.name ?? '',
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
const nullableMapper = (user: User | null | undefined) =>
  user != null ? mapper(user) : undefined;

/**
 * Repositories
 */
export const findMany: UserRepository.findMany = () => {
  return db.user.findMany().then((users) => users.map(mapper));
};

export const findById: UserRepository.findById = (id: string) => {
  return db.user.findUnique({ where: { id } }).then(nullableMapper);
};
