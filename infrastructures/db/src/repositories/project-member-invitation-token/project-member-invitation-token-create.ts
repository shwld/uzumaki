import { pipe, tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './project-member-invitation-token-record';
import { picker } from '../../lib/picker';

export const create: Aggregates['projectMemberInvitationToken']['create'] =
  input => {
    const { id, attributes } = picker(input);
    const { invitationId, projectId, role, email, state, ...columns } =
      attributes;
    return tryCatch(
      () =>
        db.projectMemberInvitationToken
          .create({
            data: {
              id,
              ...columns,
              invitation: {
                connect: {
                  id: invitationId,
                },
              },
            },
            include: {
              invitation: true,
            },
          })
          .then(convertToEntity),
      handleError
    );
  };
