import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './project-member-invitation-record';

export const findMany: Aggregates['projectMemberInvitation']['findMany'] =
  input => {
    const { project, ...conditions } = input;
    const options = {
      where: {
        projectId: project?.id,
      },
    };
    return tryCatch(async () => {
      const totalCount = await db.projectMemberInvitation.aggregate({
        ...options,
        _count: true,
      });
      return db.projectMemberInvitation
        .findMany({
          ...options,
          ...conditions,
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
