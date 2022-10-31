import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './project-record';

export const findMany: Aggregates['project']['findMany'] = ({ ...input }) => {
  const options = {};
  return tryCatch(async () => {
    const totalCount = await db.project.aggregate({
      ...options,
      _count: true,
    });
    return db.project
      .findMany({
        ...options,
        ...input,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          boardConfig: true,
          boardStatus: true,
        },
      })
      .then(items => ({
        nodes: items.map(convertToValidAttributes),
        totalCount: totalCount._count,
      }));
  }, handleError);
};
