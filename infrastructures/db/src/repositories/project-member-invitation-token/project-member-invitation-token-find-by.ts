import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './project-member-invitation-token-record';

export const findBy: Aggregates['projectMemberInvitationToken']['findBy'] =
  input => {
    return tryCatch(
      () =>
        db.projectMemberInvitationToken
          .findUnique({
            where: {
              id: input.id,
            },
            include: {
              invitation: true,
            },
          })
          .then(it => (it == null ? null : convertToEntity(it))),
      handleError
    );
  };
