import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './project-member-invitation-token-record';

export const findBy: Aggregates['projectMemberInvitationToken']['findBy'] = args => {
  return tryCatch(
    () =>
      db.projectMemberInvitationToken
        .findUnique({
          where: {
            id: args.id,
          },
        })
        .then(it => (it == null ? null : convertToValidAttributes(it))),
    handleError
  );
};
