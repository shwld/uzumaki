import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './project-record';

export const findMany: Aggregates['project']['findMany'] = ({ user }) => {
  const options = {};
  return tryCatch(async () => {
    const totalCount = await db.project.aggregate({
      ...options,
      _count: true,
    });
    return db.project
      .findMany({
        ...options,
        ...(user != null
          ? {
              where: {
                account: {
                  accountMemberships: {
                    some: {
                      userId: user.id,
                    },
                  },
                },
              },
            }
          : {}),
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          boardConfig: true,
          boardStatus: true,
          account: true,
        },
      })
      .then(items => ({
        nodes: items.map(convertToEntity),
        totalCount: totalCount._count,
      }));
  }, handleError);
};
