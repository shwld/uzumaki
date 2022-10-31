import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './project-member-invitation-record';

export const findBy: Aggregates['projectMemberInvitation']['findBy'] =
  input => {
    return tryCatch(
      () =>
        db.projectMemberInvitation
          .findUnique({
            where: {
              id: input.id,
            },
          })
          .then(it => (it == null ? null : convertToValidAttributes(it))),
      handleError
    );
  };
