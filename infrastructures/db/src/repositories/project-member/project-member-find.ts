import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './project-member-record';

export const find: Aggregates['projectMember']['find'] = input => {
  return tryCatch(
    () =>
      db.projectMembership
        .findUniqueOrThrow({
          where: {
            id: input.id,
          },
          include: {
            user: true,
          },
        })
        .then(convertToEntity),
    handleError
  );
};
