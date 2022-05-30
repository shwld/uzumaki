import { Prisma } from '@prisma/client';
import { db } from '../lib/db';

export function findMany(params: Prisma.UserFindManyArgs) {
  return db.user.findMany(params);
}

export function findById(id: string) {
  return db.user.findUnique({ where: { id } });
}
