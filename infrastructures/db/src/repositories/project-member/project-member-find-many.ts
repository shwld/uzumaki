import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './project-member-record';

export const findMany: Aggregates['projectMember']['findMany'] = ({
  ...input
}) => {
  const options = {};
  return tryCatch(async () => {
    const totalCount = await db.projectMembership.aggregate({
      ...options,
      _count: true,
    });
    return db.projectMembership
      .findMany({
        ...options,
        ...input,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
        },
      })
      .then(items => ({
        nodes: items.map(convertToValidAttributes),
        totalCount: totalCount._count,
      }));
  }, handleError);
};
