import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './project-member-invitation-record';

export const findMany: Aggregates['projectMemberInvitation']['findMany'] = ({
  user,
  ...args
}) => {
  const options = {
  };
  return tryCatch(async () => {
    const totalCount = await db.projectMemberInvitation.aggregate({
      ...options,
      _count: true,
    });
    return db.projectMemberInvitation
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
  }, handleError);
};
