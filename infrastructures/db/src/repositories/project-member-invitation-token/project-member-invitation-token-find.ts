import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './project-member-invitation-token-record';

export const find: Aggregates['projectMemberInvitationToken']['find'] =
  input => {
    return tryCatch(
      () =>
        db.projectMemberInvitationToken
          .findUniqueOrThrow({
            where: {
              id: input.id,
            },
          })
          .then(convertToEntity),
      handleError
    );
  };
