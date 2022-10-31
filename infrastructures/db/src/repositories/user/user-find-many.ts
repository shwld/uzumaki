import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './user-record';

export const findMany: Aggregates['user']['findMany'] = ({
  user,
  ...input
}) => {
  const options = {
  };
  return tryCatch(async () => {
    const totalCount = await db.user.aggregate({
      ...options,
      _count: true,
    });
    return db.user
      .findMany({
        ...options,
        ...input,
        orderBy: {
          createdAt: 'desc',
        },
      })
      .then(items => ({
        nodes: items.map(convertToValidAttributes),
        totalCount: totalCount._count,
      }));
  }, handleError);
};
