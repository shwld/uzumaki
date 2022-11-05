import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './project-member-record';

export const findBy: Aggregates['projectMember']['findBy'] = input => {
  return tryCatch(
    () =>
      db.projectMembership
        .findUnique({
          where: {
            userId_projectId: {
              userId: input.userId,
              projectId: input.projectId,
            },
          },
          include: {
            user: true,
          },
        })
        .then(it => (it == null ? null : convertToEntity(it))),
    handleError
  );
};
