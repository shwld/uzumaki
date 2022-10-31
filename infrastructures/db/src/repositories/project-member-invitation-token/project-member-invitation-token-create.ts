import { pipe, tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToValidAttributes } from './project-member-invitation-token-record';
import { picker } from '../../lib/picker';

export const create: Aggregates['projectMemberInvitationToken']['create'] =
  input => {
    const { attributes } = picker(input);
    const { invitationId, ...columns } = attributes;
    return tryCatch(
      () =>
        db.projectMemberInvitationToken
          .create({
            data: {
              ...columns,
              invitation: {
                connect: {
                  id: invitationId,
                },
              },
            },
          })
          .then(convertToValidAttributes),
      handleError
    );
  };
