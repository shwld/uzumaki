import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './project-member-record';

export const findByUserOrError: Aggregates['projectMember']['findByUserOrError'] =
  input => {
    return tryCatch(
      () =>
        db.projectMembership
          .findUniqueOrThrow({
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
          .then(convertToEntity),
      handleError
    );
  };
