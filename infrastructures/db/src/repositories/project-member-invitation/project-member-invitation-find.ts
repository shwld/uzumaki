import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './project-member-invitation-record';

export const find: Aggregates['projectMemberInvitation']['find'] = input => {
  return tryCatch(
    () =>
      db.projectMemberInvitation
        .findUniqueOrThrow({
          where: {
            id: input.id,
          },
        })
        .then(convertToEntity),
    handleError
  );
};
