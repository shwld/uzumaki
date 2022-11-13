import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './project-member-record';

export const findMany: Aggregates['projectMember']['findMany'] = ({
  ...input
}) => {
  const { project, ...conditions } = input;
  const options = {
    where: {
      projectId: project?.id,
    },
  };
  return tryCatch(async () => {
    const totalCount = await db.projectMembership.aggregate({
      ...options,
      _count: true,
    });
    return db.projectMembership
      .findMany({
        ...options,
        ...conditions,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
        },
      })
      .then(items => ({
        nodes: items.map(convertToEntity),
        totalCount: totalCount._count,
      }));
  }, handleError);
};
