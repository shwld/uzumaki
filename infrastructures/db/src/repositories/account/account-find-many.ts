import { db, handleError } from '../../lib/db';
import { Aggregates } from 'core-domain';
import { tryCatch } from 'core-domain';
import { convertToEntity } from './account-record';

export const findMany: Aggregates['account']['findMany'] = ({
  user,
  ...args
}) => {
  const options = {
    where: {
      ...(user != null
        ? {
            accountMemberships: {
              some: {
                userId: user.id,
              },
            },
          }
        : {}),
    },
  };
  return tryCatch(async () => {
    const totalCount = await db.account.aggregate({
      ...options,
      _count: true,
    });
    return db.account
      .findMany({
        ...options,
        ...args,
        orderBy: {
          createdAt: 'desc',
        },
      })
      .then(items => ({
        nodes: items.map(convertToEntity),
        totalCount: totalCount._count,
      }));
  }, handleError);
};
