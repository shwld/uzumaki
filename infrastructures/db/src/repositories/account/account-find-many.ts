import { db, handleError } from '../../lib/db';
import { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './account-record';

export const findMany: Aggregates['account']['findMany'] = async ({
  user,
  ...args
}) => {
  const options = {
    where: {
      accountMemberships: {
        some: {
          userId: user.id,
        },
      },
    },
  };
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
      nodes: items.map(convertToValidAttributes),
      totalCount: totalCount._count,
    }));
};
